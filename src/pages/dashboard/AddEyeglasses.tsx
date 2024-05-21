/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Row } from "antd";
import { FieldValues } from "react-hook-form";
import LNForm from "../../components/form/LNForm";
import LNInput from "../../components/form/LNInput";
import LNFile from "../../components/form/LNFile";
import LNSelect from "../../components/form/LNSelect";
import {
  eyeglassesBrands,
  frameMaterials,
  frameShapes,
  genderCategories,
  lensTypes,
} from "../../constants/eyeglasses";
import formDataConverter from "../../utils/formDataConverter";
import {
  useCreateEyeglassesMutation,
  useUpdateEyeglassesMutation,
} from "../../redux/features/eyeglasses/eyeglassesApi";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";
import Title from "antd/es/typography/Title";

const AddEyeglasses = () => {
  const [updateEyeglasses, { isLoading: updating }] =
    useUpdateEyeglassesMutation();
  const [createEyeglasses, { isLoading: creating }] =
    useCreateEyeglassesMutation();

  const location = useLocation();
  const eyeglass = location?.state?.eyeglass;
  const from = location?.state?.from;
  let formTitle = "Add Eyeglasses";
  let defaultValues = {};

  console.log("eyeglass", eyeglass);
  if (from === "/dashboard/eyeglassesList/create-variant") {
    formTitle = "Create New Variant";
  } else if (from === "/dashboard/eyeglassesList/update-eyeglasses") {
    formTitle = "Update Eyeglasses";
  }

  if (
    (eyeglass && from === "/dashboard/eyeglassesList/create-variant") ||
    from === "/dashboard/eyeglassesList/update-eyeglasses"
  ) {
    defaultValues = {
      ...eyeglass,
    };
  }

  const onSubmit = async (data: FieldValues) => {
    const { price, quantity, bridgeSize, templeLength } = data;
    const values = {
      ...data,
      price: Number(price),
      quantity: Number(quantity),
      bridgeSize: Number(bridgeSize),
      templeLength: Number(templeLength),
    };

    const formData = formDataConverter(values);

    if (eyeglass) {
      console.log("eyeGlass exit");
    }

    try {
      //Update eyeglasses
      if (eyeglass && from === "/dashboard/eyeglassesList/update-eyeglasses") {
        const updateData = {
          id: eyeglass?._id,
          data: formData,
        };
        const res = await updateEyeglasses(updateData).unwrap();
        if (res.success) {
          toast.success(res?.message || "Successful!");
        }
      }

      //Create New Eyeglasses and New Eyeglasses Variant
      const res = await createEyeglasses(formData).unwrap();
      if (res.success) {
        toast.success(res?.message || "Successful!");
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message || "Something went wrong!");
    }
  };

  return (
    <div>
      <Title level={2} style={{ marginBottom: "20px", fontWeight: "bold" }}>
        {formTitle}
      </Title>
      <LNForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <Row gutter={20}>
          <Col sm={24} lg={8}>
            <LNInput
              type="text"
              name="name"
              label="Eyeglasses Name"
              placeholder="Enter Eyeglasses Name"
              rules={{ required: "Eyeglasses Name is required" }}
            />
          </Col>
          <Col sm={24} lg={8}>
            <LNInput
              type="number"
              name="price"
              label="Product Price"
              placeholder="Enter Product Price"
              rules={{ required: "Product Price is required" }}
            />
          </Col>
          <Col sm={24} lg={8}>
            <LNSelect
              name="brand"
              label="Brand Name"
              options={eyeglassesBrands}
              rules={{ required: "Brand is required" }}
            />
          </Col>
          <Col sm={24} lg={8}>
            <LNInput
              type="number"
              name="quantity"
              label="Product Quantity"
              placeholder="Enter Product Quantity"
              rules={{ required: "Product Quantity is required" }}
            />
          </Col>
          <Col sm={24} lg={8}>
            <LNSelect
              name="frameMaterial"
              label="Frame Material"
              options={frameMaterials}
              rules={{ required: "Frame Material is required" }}
            />
          </Col>
          <Col sm={24} lg={8}>
            <LNSelect
              name="frameShape"
              label="Frame Shape"
              options={frameShapes}
              rules={{ required: "Frame Shape is required" }}
            />
          </Col>
          <Col sm={24} lg={8}>
            <LNSelect
              name="lensType"
              label="Lense Type"
              options={lensTypes}
              rules={{ required: "Lens Type is required" }}
            />
          </Col>
          <Col sm={24} lg={8}>
            <LNSelect
              name="gender"
              label="Gender"
              options={genderCategories}
              rules={{ required: "Gender is required" }}
            />
          </Col>
          <Col sm={24} lg={8}>
            <LNInput
              type="text"
              name="color"
              label="Color Name"
              placeholder="Enter Color Name"
              rules={{ required: "Color Name is required" }}
            />
          </Col>

          <Col sm={24} lg={8}>
            <LNInput
              type="number"
              name="templeLength"
              label="Temple Length(mm)"
              placeholder="Enter Temple Length "
              rules={{ required: "Temple Length is required" }}
            />
          </Col>
          <Col sm={24} lg={8}>
            <LNInput
              type="number"
              name="bridgeSize"
              label="Bridge Size (mm)"
              placeholder="Enter Bridge Size"
              rules={{ required: "Bridge Size is required" }}
            />
          </Col>
          <Col sm={24} lg={8}>
            <LNFile
              name="file"
              label="Add Image"
              rules={{ required: "Image is required" }}
            />
          </Col>
        </Row>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          loading={updating || creating}
        >
          {formTitle}
        </Button>
      </LNForm>
    </div>
  );
};

export default AddEyeglasses;

import LHModal from "../../components/modal/LHModal";
import { Dispatch, SetStateAction, useState } from "react";
import LNForm from "../../components/form/LNForm";
import LNInput from "../../components/form/LNInput";
import { FieldValues } from "react-hook-form";
import { Button, DatePicker, DatePickerProps } from "antd";
import { useCreateSalesMutation } from "../../redux/features/sales/salesApi";
import { toast } from "sonner";
import { TEyeglasses } from "../../types/common";

type TSaleModalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  product: TEyeglasses;
  setOrderInvoice: Dispatch<SetStateAction<object>>;
};

const SaleModal = ({
  open,
  setOpen,
  product,
  setOrderInvoice,
}: TSaleModalProps) => {
  const [saleDate, setSaleDate] = useState("");
  const [createSales, { isLoading }] = useCreateSalesMutation();

  const handleDate: DatePickerProps["onChange"] = (_date, dateString) => {
    setSaleDate(dateString as string);
  };
  const handleSale = async (values: FieldValues) => {
    const saleData = {
      productId: product._id,
      ...values,
      date: saleDate,
    };
    try {
      const res = await createSales(saleData).unwrap();
      if (res.success) {
        toast.success("Download the invoice for the order");
        const invoice = {
          sale: { ...res?.data },
          product,
        };
        setOrderInvoice(invoice);
        setOpen(false);
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error(error);
    }
  };

  return (
    <LHModal title="Sale Eyeglasses" open={open} setOpen={setOpen}>
      <LNForm onSubmit={handleSale}>
        <LNInput
          type="number"
          name="quantity"
          label="Product Quantity"
          placeholder="Enter quantity to be sold"
          rules={{ required: "Quantity is required" }}
        />
        <LNInput
          type="text"
          name="buyerName"
          label="Buyer Name"
          placeholder="Enter buyer name"
          rules={{ required: "Buyer name is required" }}
        />
        <label htmlFor="date" style={{ fontWeight: 500 }}>
          Date
        </label>
        <DatePicker
          id="date"
          format={{
            format: "YYYY-MM-DD",
            type: "mask",
          }}
          onChange={handleDate}
          required
          style={{ display: "block", marginBottom: "20px", marginTop: "10px" }}
        />
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Add Sale
        </Button>
      </LNForm>
    </LHModal>
  );
};

export default SaleModal;

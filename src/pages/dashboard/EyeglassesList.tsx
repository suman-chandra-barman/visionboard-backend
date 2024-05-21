import {
  Button,
  Flex,
  Menu,
  Popconfirm,
  Spin,
  Table,
  Tooltip,
  Typography,
} from "antd";
import type { MenuProps, TableColumnsType } from "antd";
import Title from "antd/es/typography/Title";
import {
  useBulkDeleteEyeglassesMutation,
  useDeleteEyeglassesMutation,
  useGetAllEyeglassesQuery,
} from "../../redux/features/eyeglasses/eyeglassesApi";
import { NavLink, useLocation } from "react-router-dom";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  ShoppingCartOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { TEyeglasses, TSale } from "../../types/common";
import Search, { SearchProps } from "antd/es/input/Search";
import { toast } from "sonner";
import { Dispatch, SetStateAction, useState } from "react";
import SaleModal from "./SaleModal";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFDocument from "../../components/pdf/PDFDocument";
import { items } from "../../constants/filter";

const EyeglassesList = () => {
  const location = useLocation();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState<TEyeglasses>();
  const [orderInvoice, setOrderInvoice] = useState<{
    product: TEyeglasses;
    sale: TSale;
  }>();
  const [query, setQuery] = useState({});

  const { data, isLoading, refetch } = useGetAllEyeglassesQuery(query);
  const [deleteEyeglasses] = useDeleteEyeglassesMutation();
  const [bulkDeleteEyeglasses, { isLoading: loading }] =
    useBulkDeleteEyeglassesMutation();

  const onSearch: SearchProps["onSearch"] = (value) => {
    setQuery({ queryName: "searchTerm", value: value });
    refetch();
  };

  const confirm = async (id: string) => {
    const res = await deleteEyeglasses(id).unwrap();
    if (res.success) {
      toast.success("Deleted successfully");
    } else {
      toast.error("Something went wrong!");
    }
  };

  const handleSale = (data: TEyeglasses) => {
    setOpen(true);
    setProduct(data);
  };

  const columns: TableColumnsType<TEyeglasses> = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, row) => {
        return (
          <div>
            <NavLink
              to="/"
              style={{
                fontWeight: "500",
              }}
            >
              {text}
            </NavLink>
            <Typography
              style={{
                fontWeight: "500",
                color: "GrayText",
              }}
            >
              Brand: {row?.brand}
            </Typography>
          </div>
        );
      },
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      align: "center",
    },
    {
      title: "Material",
      dataIndex: "frameMaterial",
    },
    {
      title: "Shape",
      dataIndex: "frameShape",
    },
    {
      title: "Color",
      dataIndex: "color",
      render: (_value, record) => (
        <Button
          onClick={() => handleSale(record)}
          type="primary"
          size="small"
          icon={<ShoppingCartOutlined />}
        >
          sale
        </Button>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_value, row) => {
        return (
          <Flex gap={10}>
            <NavLink
              to={{
                pathname: "/dashboard/add-eyeglasses",
              }}
              state={{
                eyeglass: row,
                from: location.pathname + "/create-variant",
              }}
            >
              <Tooltip title="Create Variant">
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  size="small"
                  shape="circle"
                />
              </Tooltip>
            </NavLink>
            <NavLink
              to={{
                pathname: "/dashboard/add-eyeglasses",
              }}
              state={{
                eyeglass: row,
                from: location.pathname + "/update-eyeglasses",
              }}
            >
              <Tooltip title="Edit">
                <Button
                  type="primary"
                  icon={<EditOutlined />}
                  size="small"
                  shape="circle"
                />
              </Tooltip>
            </NavLink>
            <Tooltip title="Delete">
              <Popconfirm
                title="Delete eyeglasses?"
                placement="topLeft"
                description="Are you sure to delete this eyeglasses?"
                onConfirm={() => confirm(row?._id as string)}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  type="primary"
                  icon={<DeleteOutlined />}
                  size="small"
                  shape="circle"
                  style={{
                    backgroundColor: "red",
                  }}
                />
              </Popconfirm>
            </Tooltip>
          </Flex>
        );
      },
    },
  ];

  const eyeglasses = data?.data?.map((eyeglass: TEyeglasses) => {
    return { ...eyeglass, key: eyeglass._id };
  });

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  const handleBulkDelete = async () => {
    const selectedEyeglasses = {
      ids: selectedRowKeys,
    };
    const res = await bulkDeleteEyeglasses(selectedEyeglasses).unwrap();
    if (res.success) {
      toast.success("Deleted successfully");
      setSelectedRowKeys([]);
    } else {
      toast.error("Something went wrong! Failed to delete");
    }
  };

  const handleFilter: MenuProps["onClick"] = (e) => {
    const queryName = e.keyPath[1];
    const value = e.keyPath[0];
    setQuery({ queryName, value });
    refetch();
  };

  return (
    <div>
      <Title level={2}>Eyeglasses List</Title>
      <SaleModal
        open={open}
        setOpen={setOpen}
        product={product as TEyeglasses}
        setOrderInvoice={setOrderInvoice as Dispatch<SetStateAction<object>>}
      />
      <Flex
        gap={20}
        style={{
          margin: "20px 0px",
        }}
      >
        <Search
          placeholder="Search by name and color"
          size="large"
          onSearch={onSearch}
          enterButton
          style={{
            maxWidth: "350px",
          }}
        />
        <NavLink to="/dashboard/add-eyeglasses">
          <Button type="primary" icon={<PlusOutlined />} size="large">
            Add New
          </Button>
        </NavLink>

        {orderInvoice && orderInvoice?.product && (
          <PDFDownloadLink
            document={<PDFDocument data={orderInvoice} />}
            fileName="invoice.pdf"
          >
            {({ loading }) =>
              loading ? (
                "Loading document..."
              ) : (
                <Button type="primary" icon={<DownloadOutlined />} size="large">
                  Download Invoice
                </Button>
              )
            }
          </PDFDownloadLink>
        )}

        <div style={{ marginBottom: 16 }}>
          <Button
            type="primary"
            onClick={handleBulkDelete}
            disabled={!hasSelected}
            loading={loading}
            size="large"
            danger
            icon={<DeleteOutlined />}
          >
            Delete
          </Button>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
          </span>
        </div>
      </Flex>
      <div
        style={{
          margin: "10px 0px",
        }}
      >
        <Title level={4}>Filter Eye Glasses </Title>
        <Menu
          onClick={handleFilter}
          style={{ width: 256 }}
          mode="vertical"
          items={items}
        />
      </div>

      {!isLoading ? (
        <div>
          <Table
            rowSelection={{
              type: "checkbox",
              ...rowSelection,
            }}
            columns={columns}
            dataSource={eyeglasses}
          />
        </div>
      ) : (
        <Flex gap="small" align="center" justify="center">
          <Spin size="large"></Spin>
        </Flex>
      )}
    </div>
  );
};

export default EyeglassesList;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Page, Text, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  subtitle: {
    fontSize: 18,
    margin: 8,
  },
  text: {
    margin: 8,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});

const PDFDocument = ({ data }: any) => (
  <Document>
    <Page style={styles.body}>
      <Text style={styles.subtitle}>
        Buyer Name: {data?.sale[0]?.buyerName}
      </Text>
      <Text style={styles.text}>Product Name:{data?.product?.name}</Text>
      <Text style={styles.text}>Brand Name:{data?.product?.brand}</Text>
      <Text style={styles.text}>Quantity: {data?.sale[0]?.quantity}</Text>
      <Text style={styles.text}>Price:{data?.product?.price}</Text>
      <Text style={styles.text}>Color:{data?.product?.color}</Text>
      <Text style={styles.text}>Date:{data?.sale[0]?.date}</Text>
      <Text style={styles.text}>
        Total Cost: {data?.sale[0]?.quantity * data?.product?.price}
      </Text>
      <Text
        style={styles.pageNumber}
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
        fixed
      />
    </Page>
  </Document>
);

export default PDFDocument;

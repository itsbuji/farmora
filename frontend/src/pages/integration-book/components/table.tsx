import type { IntegrationBookListResponse } from "../types";
import Table from "@components/Table";
import TableCell from "@components/TableCell";
import TableHeaderCell from "@components/TableHeaderCell";
import TableRow from "@components/TableRow";
import DataNotFound from "@components/data-not-found";
import dayjs from "dayjs";
import Card from "@mui/material/Card";
import Ternary from "@components/ternary";

const headers = ["Date", "Purpose", "Amount"];

type Props = {
  data: IntegrationBookListResponse;
};

const IntegrationBookTable = ({ data }: Props) => {
  const { totals } = data;
  return (
    <>
      <Ternary
        when={totals}
        then={
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3 mb-4">
            <Card className="p-6">
              <div className="flex flex-col gap-3">
                <h3 className="text-lg font-semibold capitalize text-muted-foreground">
                  Total In
                </h3>
                <p className="text-3xl font-bold tracking-tight text-green-600">
                  ₹{totals?.credit}
                </p>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex flex-col gap-3">
                <h3 className="text-lg font-semibold capitalize text-muted-foreground">
                  Total Out
                </h3>
                <p className="text-3xl font-bold tracking-tight text-red-600">
                  ₹{totals?.paid}
                </p>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex flex-col gap-3">
                <h3 className="text-lg font-semibold capitalize text-muted-foreground">
                  Balance
                </h3>
                <p
                  className={`text-3xl font-bold tracking-tight ${totals?.balance > 0 ? "text-green-600" : "text-red-600"}`}
                >
                  ₹{totals?.balance}
                </p>
              </div>
            </Card>
          </div>
        }
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="w-full">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Paid</h2>
          <Card className="overflow-hidden">
            <Table>
              <TableRow>
                {headers.map((header) => (
                  <TableHeaderCell key={header} content={header} />
                ))}
              </TableRow>
              {data.paid?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell content={dayjs(item.date).format("DD-MM-YYYY")} />
                  <TableCell content={item.name} />
                  <TableCell content={item.net_amount || "-"} />
                </TableRow>
              ))}
            </Table>
            {data.paid?.length === 0 && (
              <DataNotFound
                title={`No paid records found`}
                description={`No paid items found`}
              />
            )}
          </Card>
        </div>

        <div className="w-full">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Credit</h2>
          <Card className="overflow-hidden">
            <Table>
              <TableRow>
                {headers.map((header) => (
                  <TableHeaderCell key={header} content={header} />
                ))}
              </TableRow>
              {data.credit?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell content={dayjs(item.date).format("DD-MM-YYYY")} />
                  <TableCell content={item.name} />
                  <TableCell content={item.net_amount || "-"} />
                </TableRow>
              ))}
            </Table>
            {data.credit?.length === 0 && (
              <DataNotFound
                title={`No credit records found`}
                description={`No credit items found`}
              />
            )}
          </Card>
        </div>
      </div>
    </>
  );
};

export default IntegrationBookTable;

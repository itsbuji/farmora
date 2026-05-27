import PageTitle from "@components/PageTitle";
import GeneralSalesTable from "./components/table";
import AddGeneralSales from "./components/add";
import EditGeneralSales from "./components/edit";
import { Button } from "@mui/material";
import { useState } from "react";

const GeneralSalesPage = () => {
  const [isOpen, setOpenAdd] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const onOpen = () => setOpenAdd(true);
  const onClose = () => setOpenAdd(false);

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <PageTitle title="General Sales" />
        <Button variant="contained" onClick={onOpen}>
          Add General Sales
        </Button>
      </div>
      <GeneralSalesTable onEdit={(id) => setSelectedId(id)} />
      <AddGeneralSales isShow={isOpen} onClose={onClose} />
      <EditGeneralSales
        selectedId={selectedId}
        onClose={() => setSelectedId(null)}
      />
    </>
  );
};

export default GeneralSalesPage;

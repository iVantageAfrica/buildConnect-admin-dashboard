import React from "react";

import { URLS } from "@/libs/constants/pageurl";
import ActionButton from "@/components/ui/Button/ActionButton";
import MetricsCard from "@/components/ui/Custom/MetricsCard";
import { PlusIcon, Ticket, AlertCircle, CheckCircle, Clock } from "lucide-react";
import DashboardLayout from "../../DashboardLayout/DashboardLayout";
import TicketsTable from "./TicketTable";

const METRICS = [
  { icon: Ticket,       label: "Total Tickets",  value: "36", isPositive: true  },
  { icon: AlertCircle,  label: "Open",            value: "12", isPositive: false },
  { icon: Clock,        label: "In Progress",     value: "9",  isPositive: false },
  { icon: CheckCircle,  label: "Resolved",        value: "15", isPositive: true  },
];

const Tickets = () => {
  return (
   
      <div className="bg-gray-50">
      
        <div className="flex justify-between mb-6">
          <div>
            <p className="text-2xl font-bold">Support Tickets</p>
            <p className="text-md">Manage and track all support tickets</p>
          </div>
          <div>
            <ActionButton
              label="New Ticket"
              icon={<PlusIcon />}
              href="/create-ticket"
            />
          </div>
        </div>
        <MetricsCard metrics={METRICS} />
        <TicketsTable />
      </div>
   
  );
};

export default Tickets;
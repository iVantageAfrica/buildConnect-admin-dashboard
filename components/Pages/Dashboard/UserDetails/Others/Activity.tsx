import MetricsCard from "@/components/ui/Custom/MetricsCard";
import { DataTable } from "@/components/ui/Datatable";


export default function Activity() {
  const recentActivities = [
    { 
      id: 1, 
      activityTitle: "Document uploaded", 
      description: "Property Deed for Mount View Estate uploaded.", 
      time: "2 hours ago" 
    },
    { 
      id: 2, 
      activityTitle: "Project milestone completed", 
      description: "Foundation work completed for Villa Grande Estate.", 
      time: "3 days ago" 
    },
    { 
      id: 3, 
      activityTitle: "New project started", 
      description: "Ocean View House project initiated.", 
      time: "1 week ago" 
    },
    { 
      id: 4, 
      activityTitle: "New project started", 
      description: "Ocean View House project initiated.", 
      time: "1 week ago" 
    },
  ];

  const columns = [
    { 
      key: "activityTitle", 
      header: "Activity Title", 
      render: row => <span className="font-medium">{row.activityTitle}</span> 
    },
    { 
      key: "description", 
      header: "Description", 
      render: row => <span className="text-gray-600">{row.description}</span> 
    },
    { 
      key: "time", 
      header: "Time", 
      render: row => <span className="text-gray-500 text-sm">{row.time}</span> 
    },
  ];



  return (
    <div className="bg-gray-50">
      <div>
        <p className="text-2xl font-bold mb-4">
          Recent Activity
        </p>
      </div>
      <div className="max-w-7xl mx-auto">
        <DataTable
          columns={columns}
          data={recentActivities}
          rowsPerPageOptions={[5, 8, 10, 20]}
          defaultRowsPerPage={8}
          searchPlaceholder="Search activities..."
          searchableColumns={["activityTitle", "description"]}
          showSerialNumber={true}
        />
      </div>
    </div>
  );
}
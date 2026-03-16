import React from "react";

const PIOverview = ({ instruction }: any) => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Instruction Details</h1>

      {/* Note */}
      <p className="text-gray-700 mb-8 leading-relaxed">
        {instruction?.note ?? "No note provided for this payment instruction."}
      </p>

      <div className="grid grid-cols-2 gap-12">
        {/* Project Info */}
        <div>
          <h2 className="text-xl font-bold mb-4">Project</h2>
          <ul className="space-y-2">
            <li className="text-gray-700">
              {instruction?.project?.title ?? "N/A"}
            </li>
          </ul>
        </div>

        {/* Status Update Note */}
        <div>
          <h2 className="text-xl font-bold mb-4">Status Note</h2>
          <ul className="space-y-2">
            <li className="text-gray-700">
              {instruction?.statusUpdateNote ?? "No status note available."}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PIOverview;
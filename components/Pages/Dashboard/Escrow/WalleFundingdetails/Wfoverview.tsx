import React from "react";

const WFOverview = ({ funding }: any) => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Funding Details</h1>

      <p className="text-gray-700 mb-8 leading-relaxed">
        {funding?.note ?? "No note provided for this wallet funding request."}
      </p>

      <div className="grid grid-cols-2 gap-12">
        <div>
          <h2 className="text-xl font-bold mb-4">Payment Info</h2>
          <ul className="space-y-2">
            <li className="text-gray-700">
              Reference: {funding?.reference ?? "N/A"}
            </li>
            <li className="text-gray-700">
              Currency: {funding?.currency ?? "NGN"}
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">Status Note</h2>
          <ul className="space-y-2">
            <li className="text-gray-700">
              {funding?.statusUpdateNote ?? "No status note available."}
            </li>
          </ul>
        </div>
      </div>

      {/* Proof Document */}
      {funding?.proofDocument && (
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-4">Proof of Payment</h2>
          <a
            href={funding.proofDocument?.url ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
          >
            View Document
          </a>
        </div>
      )}
    </div>
  );
};

export default WFOverview;
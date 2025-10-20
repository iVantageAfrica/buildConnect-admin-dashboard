export const PromoCard = () => {
  return (
    <div className="bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl p-6 text-white relative overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2">
            Enjoy easy access to mortgage at affordable prices
          </h3>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex -space-x-2">
            <div className="w-12 h-12 bg-gray-300 rounded-full border-2 border-white overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-amber-400 to-amber-600"></div>
            </div>
            <div className="w-12 h-12 bg-gray-300 rounded-full border-2 border-white overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600"></div>
            </div>
          </div>
          <button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
            Get started now
          </button>
        </div>
      </div>
    </div>
  );
};
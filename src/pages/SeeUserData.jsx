import { RxCross1 } from "react-icons/rx";

function SeeUserData({ UserDivData, UserDiv, setUserDiv }) {
  return (
    <>
      {/* Overlay */}
      <div
        className={`${UserDiv} fixed inset-0 bg-black/50 backdrop-blur-sm z-40`}
        onClick={() => setUserDiv("hidden")}
      ></div>

      {/* Modal */}
      <div
        className={`${UserDiv} fixed inset-0 flex items-center justify-center z-50`}
      >
        <div className="bg-white text-gray-800 rounded-2xl shadow-xl w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] p-6 animate-fadeInScale">
          {/* Header */}
          <div className="flex items-center justify-between border-b pb-3">
            <h1 className="text-xl font-bold text-gray-900">
              User Information
            </h1>
            <button
              className="p-2 rounded-full hover:bg-gray-200 transition"
              onClick={() => setUserDiv("hidden")}
            >
              <RxCross1 className="text-gray-600" size={20} />
            </button>
          </div>

          {/* User Details */}
          <div className="mt-4 space-y-4">
            <div>
              <span className="block text-sm text-gray-500">Username</span>
              <span className="font-semibold text-lg">
                {UserDivData.username}
              </span>
            </div>
            <div>
              <span className="block text-sm text-gray-500">Email</span>
              <span className="font-semibold text-lg">{UserDivData.email}</span>
            </div>
            <div>
              <span className="block text-sm text-gray-500">Address</span>
              <span className="font-semibold text-lg">
                {UserDivData.address}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>
        {`
          .animate-fadeInScale {
            animation: fadeInScale 0.3s ease-out forwards;
          }
          @keyframes fadeInScale {
            0% { opacity: 0; transform: scale(0.95); }
            100% { opacity: 1; transform: scale(1); }
          }
        `}
      </style>
    </>
  );
}

export default SeeUserData;

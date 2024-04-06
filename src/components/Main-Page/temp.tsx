import { Loader } from "../Loaders/Loader";

export default function Temp() {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex   items-center space-x-2">
      <Loader color="white" />
    </div>
  );
}

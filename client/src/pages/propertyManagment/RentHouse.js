import SideBar from "../../components/navBar/SideBar";
import AdForm from "../../components/Forms/AdForm";

export default function RentHouse() {
  return (
    <div className="contaienr">
      <SideBar />
      <h1 className="display-1 bg-primary text-light p-5">Rent House</h1>
      <div className="row">
        <div className='col-lg-6 offset-lg-3'>
          <AdForm action="Rent" type="House" />
        </div>
      </div>
    </div>
  );
}
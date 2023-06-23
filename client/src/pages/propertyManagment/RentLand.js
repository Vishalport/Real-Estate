import SideBar from "../../components/navBar/SideBar";
import AdForm from "../../components/Forms/AdForm";

export default function RentLand() {
  return (
    <div className="contaienr">
      <SideBar />
      <h1 className="display-1 bg-primary text-light p-5">Rent Land</h1>
      <div className="row">
        <div className='col-lg-6 offset-lg-3'>
          <AdForm action="Rent" type="Land" />
        </div>
      </div>
    </div>
  );
}
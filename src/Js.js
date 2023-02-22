import React, { useState } from "react";
import Swal from "sweetalert2";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { AiTwotoneLike } from "react-icons/ai";

function Js() {
  const [tableBolean, setBolean] = useState(true);
  const [cardBolean, settBolean] = useState(true);
  const [inputData, setInputData] = useState({
    soni: 0,
    id: "",
    nomi: "",
    haqida: "",
    chegirma: "",
    narxi: "",
    like: false,
  });
  const [malumotlar, setSavatmalumotlar] = useState([]);
  const [savatmalumot, setSavatmalumot] = useState([]);
  const [chiqarBolean, setingBolean] = useState(true);

  let plusfun = (iteam) => {
    setSavatmalumot(
      savatmalumot.map((val) =>
        val.id === iteam.id && val.soni < 10
          ? { ...val, soni: +val.soni + 1 }
          : val
      )
    );
    console.log(iteam.soni);
  };
  let minusfun = (iteam) => {
    if (iteam.soni > 0) {
      setSavatmalumot(
        savatmalumot.map((obj) =>
          obj.id === iteam.id ? { ...obj, soni: obj.soni - 1 } : obj
        )
      );
    } else {
      alert("error");
    }
  };
  function fun() {
    settBolean(!cardBolean);
  }
  function savatfun(iteam) {
    if (savatmalumot.filter((val) => val.id === iteam.id).length === 0) {
      setSavatmalumot([...savatmalumot, iteam]);
    } else {
      alert("bu malumot bor");
    }
  }
  function chiqarfun() {
    setingBolean(!chiqarBolean);
  }
  function likefun(iteam) {
    setSavatmalumotlar(
      malumotlar.map((val) =>
        val.id === iteam.id ? { ...val, like: !val.like } : val
      )
    );
  }
  function clearfun() {
    setInputData({
      soni: "0",
      id: "",
      nomi: "",
      haqida: "",
      chegirma: "",
      narxi: "",
    });
    console.log(inputData);
  }
  let hamdletable = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  let sendfun = () => {
    if(inputData.nomi === ''){
      alert("nomini to'ldiring")
    }else if(inputData.haqida === '' ){
      alert("haqidani to'ldiring")

    }else if(inputData.narxi === '' ){
      alert("narxini to'ldiring")

    }else if(inputData.chegirma === '' ){
      alert("chegirmani to'ldiring")

    }else{
  if (inputData.id === "") {
      setSavatmalumotlar([
        ...malumotlar,
        { ...inputData, id: new Date().getTime() },
      ]);
      setBolean(false);
      console.log(malumotlar);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Ishingiz saqlandi",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        title: "Ozgarishlarni saqlamoqchimisiz?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "saqlansin",
        denyButtonText: `saqlanmasin`,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Saved!", "", "success");
          setSavatmalumotlar(
            malumotlar.map((val) => (val.id === inputData.id ? inputData : val))
          );
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
        setBolean(false);
       

      });
    }

    }

  
    clearfun();
  };

  let handleimg = (e) => {
    setInputData({
      ...inputData,
      rasm: URL.createObjectURL(e.target.files[0]),
    });
  };
  function deletefunc(id) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Rostdan xam ochirmoqchimisiz ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: " o'chirilsin !",
        cancelButtonText: "bekor qilinsin!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            "ochirildi !",
            "Moffaqiyatli ochirildi"
          );
          setSavatmalumot(savatmalumot.filter((val) => val.id !== id));
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire("Bekor qilindi :)");
        }
      });
  }

  const editefunc = (iteam) => {
    setingBolean(true);
    setInputData(iteam);
    settBolean(false);

  };

  return (
    <>
      <div className="abaot">
        <button
          style={{ backgroundColor: chiqarBolean ? "#6fff00" : "red",  position:"fixed"}}
          onClick={() => chiqarfun()}
          className="siklebtn11"
        >
          {chiqarBolean ? "table" : "form"}
          <span> {savatmalumot.length} </span>
        </button><br />
         <button className="btnnn" onClick={() => fun()}>{cardBolean ? 'form' : 'card '}</button>
        {chiqarBolean ? (
          <div className="formbox">
            {
              cardBolean ?(  <form className="form">
              <h2 style={{ textAlign: "center" }}>crud</h2>
              <input
                type="text"
                placeholder="nomi"
                name="nomi"
                onInput={hamdletable}
                value={inputData.nomi}
              />
              <input
                type="text"
                placeholder="haqida"
                name="haqida"
                value={inputData?.haqida}
                onInput={hamdletable}
              />
              <input
                type="number"
                placeholder="narxi"
                name="narxi"
                value={inputData?.narxi}
                onInput={hamdletable}
              />
              <input
                type="number"
                placeholder="chegirma"
                name="chegirma"
                value={inputData?.chegirma}
                onInput={hamdletable}
              />
              <input type="file" onInput={handleimg} />
              <button onClick={sendfun} type={"button"} className="btnn">
                send
              </button>
            </form>):(
              
             <div className="cards">
              {malumotlar.length > 0 ? (
                malumotlar.map((iteam, index) => (
                  <div key={index} className="card">
                    <h1 className="flex">T/r :{index + 1}</h1>
                    <br />
                    <h2>{iteam.nomi}</h2>
                    <img className="sikleimg" src={iteam.rasm} alt="" />
                    <p className="p">Haqida :{iteam.haqida}</p>
                    <br />
                    <p className="p">Narxi :{iteam.narxi}$</p>
                    <br />
                    <p className="p">CHegirma :{iteam.chegirma}%</p>
                    <br />

                    <div className="flexx">
                      <HiOutlineShoppingCart
                        onClick={() => savatfun(iteam)}
                        className="savat"
                      />
                      <AiTwotoneLike
                        className="savat"
                        style={{ color: iteam.like ? "red" : "black" }}
                        onClick={() => likefun(iteam)}
                      />
                       <button
                        className="siklebtn1"
                        onClick={() => editefunc(iteam)}
                      >
                        edite
                      </button>
                    </div>
                
                  </div>
                ))
              ) : (
                <div>
                  <h1 style={{ textAlign: "center" }} colSpan={10}>
                    {" "}
                    no data .....
                  </h1>
                </div>
              )}
            </div> 
            )
            }
           
          </div>
        ) : (
          <table border={1}>
            <thead>
              <tr>
                <th>#</th>
                <th>nomi</th>
                <th>haqida</th>
                <th>narxi</th>
                <th>chegirma</th>
                <th>img</th>
                <th>delete</th>
                <th>soni</th>
                <th>umumiy narx</th>
              </tr>
            </thead>
            <tbody>
              {savatmalumot.length > 0 ? (
                savatmalumot.map((iteam, index) => (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <th>{iteam.nomi}</th>
                    <th>{iteam.haqida}</th>
                    <th>{iteam.narxi}$</th>
                    <th>{iteam.chegirma}%</th>
                    <th>
                      <img className="sikleimg1" src={iteam.rasm} alt="" />
                    </th>
                    <th>
                      <button
                        className="siklebtn"
                        onClick={() => deletefunc(iteam.id)}
                      >
                        delete
                      </button>
                    </th>
                 
                    <th className="flexxx">
                      <button onClick={() => plusfun(iteam)} className="plus">
                        +
                      </button>
                      {iteam.soni}
                      <button onClick={() => minusfun(iteam)} className="minus">
                        -
                      </button>
                      <br />
                    </th>
                    <th>
                      {/* {savatmalumot.reduce((a, b) => a + b.soni * b.narxi, 0)}$ */}
                      {(
                        (iteam.narxi - (iteam.narxi / 100) * iteam.chegirma) *
                        iteam.soni
                      ).toFixed(2)}
                    </th>
                  </tr>
                ))
              ) : (
                <tr>
                  <th colSpan={10}> no data .....</th>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
export default Js;

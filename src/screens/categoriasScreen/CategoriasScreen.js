import { NavBarMain } from "../../components/navBarMain/NavBarMain"
import { ArrowRightSquareFill } from 'react-bootstrap-icons';

import { useState } from "react";
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
  } from "chart.js";
  
  // Registrar los componentes necesarios de Chart.js
  

import DataTable from 'datatables.net-react';
import DT from 'datatables.net-bs5';

import './_categoriasScreen.scss'
import 'datatables.net-responsive-bs5';
import { Button } from "react-bootstrap";
ChartJS.register(ArcElement, Tooltip, Legend);
DataTable.use(DT);
const options = {
    language: {
      processing: "Procesando...",
      search: "Buscar:",
      lengthMenu: "Mostrar _MENU_ registros",
      info: "Mostrando del _START_ al _END_ de _TOTAL_ registros",
      infoEmpty: "Mostrando 0 registros",
      infoFiltered: "(filtrado de _MAX_ registros totales)",
      loadingRecords: "Cargando registros...",
      zeroRecords: "No se encontraron resultados",
      emptyTable: "No hay datos disponibles en la tabla",
      paginate: {
        first: "Primero",
        previous: "Anterior",
        next: "Siguiente",
        last: "Último"
      }
    }
};
export const CategoriasScreen = () => {
    const data = {
        labels: ["Ventas Online", "Ventas en Tienda", "Ventas Mayoristas"],
        datasets: [
          {
            label: "Distribución de Ventas",
            data: [300, 500, 200],
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)", // Rojo
              "rgba(54, 162, 235, 0.6)", // Azul
              "rgba(255, 206, 86, 0.6)", // Amarillo
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)", // Borde rojo
              "rgba(54, 162, 235, 1)", // Borde azul
              "rgba(255, 206, 86, 1)", // Borde amarillo
            ],
            borderWidth: 1,
          },
        ],
      };
      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: "top", // Posición de la leyenda (top, bottom, left, right)
          },
          title: {
            display: true,
            text: "Distribución de Ventas por Canal",
          },
        },
      };



    const [tableData, setTableData] = useState([
        [ 'Tiger Nixon', 'System Architect','Tiger Nixon', 'System Architect' , 'System Architect'],
        [ 'Garrett Winters', 'Accountant','Tiger Nixon', 'System Architect', 'System Architect' ],
        // ...
      ]);
    return(
        <div style={{paddingBottom:"100px"}}>
            <NavBarMain title={"Categorías"} name={"David Franco"}/>
            <div className="archivo__container">
                <div className="d-flex gap-3">
                    <h5>Archivo 1</h5>
                    <ArrowRightSquareFill size={24} color='gray'/>
                </div>
                <h6>
                    2024-12-28
                </h6>
            </div>
            <div className="movimientos__container container">
                <div className="row">
                    <div className="movimientos__grafica--container col">
                        <h5>Categorias</h5>
                        <Pie data={data} options={options}/>
                    </div>
                    <div className="movimientos__tabla--container col" >
                        <h5>Movimientos Por categoria</h5>
                        <DataTable options={options} data={tableData} className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Fecha</th>
                                    <th>Monto</th>
                                    <th>Concepto</th>
                                    <th>Orígen</th>
                                    <th>Destino</th>
                                </tr>
                            </thead>
                        </DataTable>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Button variant="primary">
                            Regresar
                        </Button>
                    </div>
                </div>
                
            </div>
            
            
        </div>
    )
}
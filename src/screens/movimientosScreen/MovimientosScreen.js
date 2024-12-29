import { NavBarMain } from "../../components/navBarMain/NavBarMain"
import { ArrowRightSquareFill } from 'react-bootstrap-icons';

import { useState } from "react";


import DataTable from 'datatables.net-react';
import DT from 'datatables.net-bs5';

import './_movimientosScreen.scss'
import 'datatables.net-responsive-bs5';
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
export const MovimientosScreen = () => {
    const [tableData, setTableData] = useState([
        [ 'Tiger Nixon', 'System Architect','Tiger Nixon', 'System Architect' , 'System Architect'],
        [ 'Garrett Winters', 'Accountant','Tiger Nixon', 'System Architect', 'System Architect' ],
        // ...
      ]);
    return(
        <div>
            <NavBarMain title={"Movimientos"} name={"David Franco"}/>
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
                        <h5>Movimientos</h5>
                    </div>
                    <div className="movimientos__tabla--container col" >
                        <h5>Tabla Movimientos</h5>
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
                
            </div>
            
            
        </div>
    )
}
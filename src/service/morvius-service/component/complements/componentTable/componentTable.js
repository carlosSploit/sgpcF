import "./componenTable.css";

export function ComponentTable(props){
    const {children} = props;
    return (
        <table class="content-table"> 
            {children}
        </table>
    );
}

export function ComponentTableHead(props){
    const {headers=[
        {
            label: "#",
            asling: "lef",
            isOcult: false,
            width: "5%"
        },
        {
            label: "Nombre",
            asling: "lef",
            isOcult: false,
            width: ""
        },
        {
            label: "Correo",
            asling: "lef",
            isOcult: true,
            width: ""
        }
    ]} = props;
    return (
        <thead> 
            <tr>
                {
                    headers.map((item)=>{
                        return (<th className={`${"content-table-encabezado " + item.asling  + ((item.isOcult)?" ocp":"")}`} style={(item.width == "")?{}:{width: `${item.width}`}}>{item.label}</th>);
                    })
                }
            </tr> 
        </thead>
    );
}

// export function ComponentTableBody(props){
//     return(
//         <tbody>
//             <tr style={{height: "20px"}}>
//                 <th className="content-table-item-encabezado cent" style={{width:"10%"}}>{itemdate.id_admin}</th>
//                 <th className="content-table-item-encabezado lef">{itemdate.nombre}</th>
//                 <th className="content-table-item-encabezado lef ocp">{itemdate.correo}</th>
//                 <th className="content-table-item-encabezado cent" style={{width:"100px"}}>
//                     <div onClick={async ()=>{
//                         let result = await deleteadmin(itemdate.id_admin);
//                         handleNewNotification(dispatch,result.messege, result.status);
//                         setTimeout(() => {
//                                 (async ()=>{await onDelectPerson();})();
//                                 // limpiartext();
//                                 // console.log(resul);
//                         }, 500);
//                     }} className="container_ItemAdmin_conten_actions_item">
//                         <DeleteOutlined className="container_ItemAdmin_conten_actions_icondelect" />
//                     </div>
//                     {(interfaces != null)?interfaces:<></>}
//                 </th>
//             </tr>
//         </tbody>
//     );
// }
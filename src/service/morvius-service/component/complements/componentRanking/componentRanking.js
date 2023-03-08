import ComponentItenRank from "./complements/componentItenRank/componentItenRank";
import { ComponentRankprins } from "./complements/componentRankprins/componentRankprins";
import "./componentRanking.css";

export const ComponentRanking = (props) =>{

    const {listdata=[
        {
            position: 1,
            name: "Carlos arturo guerrero",
            photo: "https://us.123rf.com/450wm/thesomeday123/thesomeday1231712/thesomeday123171200009/91087331-icono-de-perfil-de-avatar-predeterminado-para-hombre-marcador-de-posici%C3%B3n-de-foto-gris-vector-de-ilu.jpg?ver=6",
            punto: 200
        },
        {
            position: 2,
            name: "Carlos arturo guerrero",
            photo: "https://us.123rf.com/450wm/thesomeday123/thesomeday1231712/thesomeday123171200009/91087331-icono-de-perfil-de-avatar-predeterminado-para-hombre-marcador-de-posici%C3%B3n-de-foto-gris-vector-de-ilu.jpg?ver=6",
            punto: 180
        },
        {
            position: 3,
            name: "Carlos arturo guerrero",
            photo: "https://us.123rf.com/450wm/thesomeday123/thesomeday1231712/thesomeday123171200009/91087331-icono-de-perfil-de-avatar-predeterminado-para-hombre-marcador-de-posici%C3%B3n-de-foto-gris-vector-de-ilu.jpg?ver=6",
            punto: 170
        },
        {
            position: 4,
            name: "Carlos arturo guerrero",
            photo: "https://us.123rf.com/450wm/thesomeday123/thesomeday1231712/thesomeday123171200009/91087331-icono-de-perfil-de-avatar-predeterminado-para-hombre-marcador-de-posici%C3%B3n-de-foto-gris-vector-de-ilu.jpg?ver=6",
            punto: 140
        },
        {
            position: 5,
            name: "Carlos arturo guerrero",
            photo: "https://us.123rf.com/450wm/thesomeday123/thesomeday1231712/thesomeday123171200009/91087331-icono-de-perfil-de-avatar-predeterminado-para-hombre-marcador-de-posici%C3%B3n-de-foto-gris-vector-de-ilu.jpg?ver=6",
            punto: 130
        },
        // {
        //     position: 6,
        //     name: "Carlos arturo guerrero",
        //     photo: "https://us.123rf.com/450wm/thesomeday123/thesomeday1231712/thesomeday123171200009/91087331-icono-de-perfil-de-avatar-predeterminado-para-hombre-marcador-de-posici%C3%B3n-de-foto-gris-vector-de-ilu.jpg?ver=6",
        //     punto: 120
        // }
    ]} = props;

    return (
        <div className="conten_ranking_general">
            {
                (listdata.length > 4)?
                <>
                    <div style={{height:"10px"}} />
                    <div className="conten_ranking_general_rankbasic" >
                        <ComponentRankprins position={listdata[1].position} name={listdata[1].name} punto={listdata[1].punto} photo={listdata[1].photo}/>
                        <ComponentRankprins position={listdata[0].position} name={listdata[0].name} punto={listdata[0].punto} photo={listdata[0].photo}/>
                        <ComponentRankprins position={listdata[2].position} name={listdata[2].name} punto={listdata[2].punto} photo={listdata[2].photo}/>
                    </div>
                    <div style={{height: "20px"}}/>
                </>
                : <></>
            }
            {/* <div className="conten_ranking_general_subtitle">Lista de participantes:</div> */}
            <div className="conten_ranking_general_rankgenerl" >
                {/* filtra los primeros 3 items si es mayor de 4 items, sino imprimira 4 */}
                {((listdata.length > 4)?listdata.filter((_,ind)=>{return ind > 2}):listdata).map((item)=>{
                    return <ComponentItenRank position={item.position} name={item.name} punto={item.punto} photo={item.photo}/>
                })}
            </div>
        </div>
    );
}
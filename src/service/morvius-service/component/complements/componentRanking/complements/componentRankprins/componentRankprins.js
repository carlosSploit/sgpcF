import "./componentRankprins.css"

export function ComponentRankprins(props){

    const {name="carlos arturo guerrero castillo", position=1, punto=12345, photo="https://us.123rf.com/450wm/thesomeday123/thesomeday1231712/thesomeday123171200009/91087331-icono-de-perfil-de-avatar-predeterminado-para-hombre-marcador-de-posici%C3%B3n-de-foto-gris-vector-de-ilu.jpg?ver=6"} = props;
    const listicons = {1: "🥇", 2:"🥈", 3:"🥉"};

    return (
        <div className="conten_ranking_general_rankbasic_Item_subcontent">
            <div className="conten_ranking_general_rankbasic_subcontent_nameuser">{name}</div>
            <div className="conten_ranking_general_rankbasic_subcontent" style={{height: `${140 - (position * 15)}px`}}>
                <div className="conten_ranking_general_rankbasic_subcontent_photo" style={{backgroundImage: `url('${photo}')`}}></div>
                <div className="conten_ranking_general_rankbasic_subcontent_contentInfo">
                    <div className="conten_ranking_general_rankbasic_subcontent_contentInfo_posision">{`${listicons[position]}`}</div>
                    <div className="conten_ranking_general_rankbasic_subcontent_contentInfo_value">{`pt ${punto}`}</div>
                </div>
            </div>
        </div>
    );
}
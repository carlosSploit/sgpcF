// import { Administrador } from "../../pages/Administrador/ClientAnalist";
import { ClientAnalist } from "../../pages/clientAnalist/ClientAnalist";
import { closeSesion } from "../repository/mithelworks";
import { ComponentLoadDataProf, ControllerRouter } from "./routerscontroler";
import { validationAdmin, validationProfesor } from "./valideRouter";
/*
considerar que en las rutas se debe tener una estructura para que el sistema pueda funcionar correctamente
para esto se debe cumplir con el formato indicado :
    - formato de la lista de routas del apartados
    [apartado] : [lista de rutas]
    - formato de la ruta
    {
        id: [id de la ruta o la opccion de la ruta],
        patch: [ruta de accion],
        component: [componente que se desea imprimir en formato jsx.Element],
        valid: [validacion o permisos que se tiene que hacer para acceder al componente]
    }
    - formato del pactch
    patch : '[abrebriatura]/[opccion_principal]/[sub_opccion]/[parametros o params]'
si la ruta especificada tiene parametros y la ruta principal no, siempre se tendra que priorizar la ruta principal, esto
se traduciria de la siguiente manera:

/prof/edit                    -> ruta principal = priorizada
/prof/edit/:prof_edit_options -> ruta con parametros = no priorizada

*/
export const routerLinks = () => {
    return {
        admin:[
            new ControllerRouter({
                id: 0,
                patch: '/adm/manten/admin',
                component: <ClientAnalist idPageLoad={0} onCerrarSecion={closeSesion} />,
                valid: validationAdmin
            }).toJson(),
            new ControllerRouter({
                id: 1,
                patch: '/adm/manten/profesor',
                component: <ClientAnalist idPageLoad={1} onCerrarSecion={closeSesion} /> ,
                valid: validationAdmin
            }).toJson(),
            new ControllerRouter({
                id: 2,
                patch: '/adm/manten/alumn',
                component: <ClientAnalist idPageLoad={2} onCerrarSecion={closeSesion}/> ,
                valid: validationAdmin
            }).toJson(),
            new ControllerRouter({
                id: 3,
                patch: '/adm/acade/mcurso',
                component: <ClientAnalist idPageLoad={3} onCerrarSecion={closeSesion}/> ,
                valid: validationAdmin
            }).toJson(),
            new ControllerRouter({
                id: 3,
                patch: '/adm/acade/mcurso/:id_curso',
                component: <ClientAnalist idPageLoad={3} onCerrarSecion={closeSesion}/>,
                valid: validationAdmin
            }).toJson(),
            new ControllerRouter({
                id: 0,
                patch: '/adm/acade/mcurso/:id_curso/:prof_acad_options',
                component: <ClientAnalist idPageLoad={3} onCerrarSecion={closeSesion}/>,
                valid: validationAdmin
            }).toJson(),
            new ControllerRouter({
                id: 4,
                patch: '/adm/acade/preinscrip',
                component: <ClientAnalist idPageLoad={4} onCerrarSecion={closeSesion}/> ,
                valid: validationAdmin
            }).toJson()
        ],
        // profes:[
        //     new ControllerRouter({
        //         id: 0,
        //         patch: '/prof/acade/curso',
        //         component: <ComponentLoadDataProf idPageLoad={0} />,
        //         valid: validationProfesor
        //     }).toJson(),
        //     new ControllerRouter({
        //         id: 0,
        //         patch: '/prof/acade/curso/:id_curso_edt',
        //         component: <ComponentLoadDataProf idPageLoad={0} />,
        //         valid: validationProfesor
        //     }).toJson(),
        //     new ControllerRouter({
        //         id: 0,
        //         patch: '/prof/acade/curso/:id_curso_edt/:prof_acad_options',
        //         component: <ComponentLoadDataProf idPageLoad={0} />,
        //         valid: validationProfesor
        //     }).toJson(),
        //     new ControllerRouter({
        //         id: 998,
        //         patch: '/prof/config',
        //         component: <ComponentLoadDataProf idPageLoad={998} />,
        //         valid: validationProfesor
        //     }).toJson(),
        //     new ControllerRouter({
        //         id: 998,
        //         patch: '/prof/config/:prof_edit_options',
        //         component: <ComponentLoadDataProf idPageLoad={998} />,
        //         valid: validationProfesor
        //     }).toJson(),
        //     new ControllerRouter({
        //         id: 998,
        //         patch: '/prof/config/:prof_edit_options/:id_option',
        //         component: <ComponentLoadDataProf idPageLoad={998} />,
        //         valid: validationProfesor
        //     }).toJson()
        // ]
    };
}
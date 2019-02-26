//Dep
import axios from "axios";

//url of facturaTable
const url = "http://192.168.11.126:8080/gesii/factura/expedidas";
//url of Expedidas
const urlExpredida = 'http://192.168.11.126:8080/gesii/factura/expedida';
//url of valores de combos
const urlcomboFill = 'http://192.168.11.126:8080/gesii/config'

/*--------------------------------------EXPORTED FUNCTIONS----------------------------------------------*/
export function fetchExpedida(idfactura) {
    return  axios({ 
            method: 'GET',
            url: urlExpredida, 
            headers: { //header conf of the axios
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Credentials': true,
                  'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'},
              params : {
                  id:idfactura
              }
            })
    }
export function loadTenFacturas(entidad, ejercicio, periodo) {
     return  axios({ 
            method: 'POST',
            url: url, 
            headers: { //header conf of the axios
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
                'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'}, 
            params: { //Use fot query string on the url
                entidad: entidad,
                ejercicio : ejercicio,
                pdte: periodo,
                size : '10'   } 
              })
    }
    export function combofill() {
        return  axios({ 
                method: 'GET',
                url: urlcomboFill, 
                headers: { //header conf of the axios
                      'Access-Control-Allow-Origin': '*',
                      'Access-Control-Allow-Credentials': true,
                      'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'},
                })
        }
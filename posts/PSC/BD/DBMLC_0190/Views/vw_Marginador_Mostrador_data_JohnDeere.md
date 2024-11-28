# View: vw_Marginador_Mostrador_data_JohnDeere

## Usa los objetos:
- [[vw_Marginador_BN_JD_MesaRepuestos]]
- [[vw_Marginador_Centros_JD]]

```sql

CREATE view [dbo].[vw_Marginador_Mostrador_data_JohnDeere] as  

select año,                         mes,              CodigoEmpresa,  CodigoCentro, 
	   centro,			            CodigoSeccion,    seccion,        marca,         
	   descripcionpedidotipoventas, NumeroFactura,    Valor,          Clasificacion5Mov,
	   Clasificacion6Mov,           FechaFactura
 from  vw_Marginador_Centros_JD a							
 union all

select año,                         mes,             CodigoEmpresa,   CodigoCentro,
       centro, 				        CodigoSeccion,   seccion,         marca, 
	   descripcionpedidotipoventas, NumeroFactura,   Valor,           Clasificacion5Mov,
	   Clasificacion6Mov,           FechaFactura
 from vw_Marginador_BN_JD_MesaRepuestos a		
			-- where numerofactura ='RIB/119/2023'

```

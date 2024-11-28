# View: vw_Marginador_BN_JD_MesaRepuestos

## Usa los objetos:
- [[vw_MarginadorBaseJohnDeere]]

```sql


CREATE view [dbo].[vw_Marginador_BN_JD_MesaRepuestos] as
select año=year(FechaFactura),      mes=month(FechaFactura),  CodigoEmpresa,        CodigoCentro,
	   centro, 				        CodigoSeccion,            seccion,              marca, 
	   descripcionpedidotipoventas, NumeroFactura,            Valor=sum(ValorNeto), Clasificacion5Mov,
	   Clasificacion6Mov, FechaFactura
  from vw_MarginadorBaseJohnDeere a
 where a.CodigoCentro = 146 --BN-Bta-Mesa de Repuestos
   and a.Seccion like '%JD%'
--and a.Ano_Periodo = 2023 --RI3/351/2022
--and a.Mes_Periodo = 9
--and a.CodigoCentro = 124
    --and a.NumeroFactura like '%R044%'
--and a.NumeroFactura like '109426%'
group by year(FechaFactura),          month(FechaFactura),  CodigoEmpresa,     CodigoCentro,
         centro,                      CodigoSeccion,        seccion,           marca,
     	 descripcionpedidotipoventas, NumeroFactura,        Clasificacion5Mov, Clasificacion6Mov,
		 FechaFactura

```

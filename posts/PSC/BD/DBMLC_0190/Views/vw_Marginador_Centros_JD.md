# View: vw_Marginador_Centros_JD

## Usa los objetos:
- [[vw_MarginadorBaseJohnDeere]]

```sql


CREATE view [dbo].[vw_Marginador_Centros_JD] as
select año=year(FechaFactura),      mes=month(FechaFactura), CodigoEmpresa,        CodigoCentro, 
       centro,			           CodigoSeccion,           seccion,              marca,         
	   descripcionpedidotipoventas, NumeroFactura,           Valor=sum(ValorNeto), Clasificacion5Mov,
	   Clasificacion6Mov,           FechaFactura
  from vw_MarginadorBaseJohnDeere a
  where a.centro like '%JD-%'
  --and a.CodigoCentro = 124
  --and a.NumeroFactura like '%R044%' -- R021/118612/2023
  --and a.NumeroFactura like '%109426%'
  -- and a.Ano_Periodo = 2023				
 group by year(FechaFactura),           month(FechaFactura), CodigoEmpresa,     CodigoCentro,
          centro,   			        CodigoSeccion,       seccion,           marca,
  		  descripcionpedidotipoventas,  NumeroFactura,       Clasificacion5Mov, Clasificacion6Mov	,
		  FechaFactura

```

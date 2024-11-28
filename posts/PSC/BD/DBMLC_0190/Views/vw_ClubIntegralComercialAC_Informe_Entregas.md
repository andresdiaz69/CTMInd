# View: vw_ClubIntegralComercialAC_Informe_Entregas

## Usa los objetos:
- [[vw_ClubIntegralComercialAC_Entregas_Comparativa]]

```sql



CREATE view [dbo].[vw_ClubIntegralComercialAC_Informe_Entregas] as
select distinct 

isnull(row_number()over (order by CedulaVendedor asc),-1)as orden,CedulaVendedor,NombreVendedor,CodigoCentro,NombreCentro,CodigoMarcaGrupo,MarcaGrupo,CodigoMarcaCI,MarcaCI,sum(Julio)Julio,sum(Agosto)Agosto,sum(Septiembre)Septiembre,sum(Octubre)Octubre,sum(Noviembre)Noviembre,sum(Diciembre)Diciembre,sum(Enero)Enero,sum(Febrero)Febrero,sum(Marzo)Marzo,sum(Abril)Abril,sum(Mayo)Mayo,sum(Junio)Junio
from
(
select * from vw_ClubIntegralComercialAC_Entregas_Comparativa
)a
group by CedulaVendedor,NombreVendedor,CodigoCentro,NombreCentro,CodigoMarcaGrupo,MarcaGrupo,CodigoMarcaCI,MarcaCI

union all 

select orden, CedulaVendedor,NombreVendedor,CodigoCentro,NombreCentro,CodigoMarcaGrupo,MarcaGrupo,CodigoMarcaCI,MarcaCI,sum(Julio)Julio,sum(Agosto)Agosto,sum(Septiembre)Septiembre,sum(Octubre)Octubre,sum(Noviembre)Noviembre,sum(Diciembre)Diciembre,sum(Enero)Enero,sum(Febrero)Febrero,sum(Marzo)Marzo,sum(Abril)Abril,sum(Mayo)Mayo,sum(Junio)Junio
from
(
	select ''orden,''CedulaVendedor,''NombreVendedor,''CodigoCentro,NombreCentro,CodigoMarcaGrupo,''MarcaGrupo,CodigoMarcaCI,MarcaCI,Julio,Agosto,Septiembre,Octubre,Noviembre,Diciembre,Enero,Febrero,Marzo,Abril,Mayo,Junio
	from 
	(
		select distinct isnull(row_number()over (order by CedulaVendedor asc),-1)as orden,  
		CedulaVendedor,NombreVendedor,CodigoCentro,NombreCentro,CodigoMarcaGrupo,MarcaGrupo,CodigoMarcaCI,MarcaCI,sum(Julio)Julio,sum(Agosto)Agosto,sum(Septiembre)Septiembre,sum(Octubre)Octubre,sum(Noviembre)Noviembre,sum(Diciembre)Diciembre,sum(Enero)Enero,sum(Febrero)Febrero,sum(Marzo)Marzo,sum(Abril)Abril,sum(Mayo)Mayo,sum(Junio)Junio
		from
		(
			select * from vw_ClubIntegralComercialAC_Entregas_Comparativa
		)a
		group by CedulaVendedor,a.NombreVendedor,CodigoCentro,NombreCentro,CodigoMarcaGrupo,MarcaGrupo,CodigoMarcaCI,MarcaCI
	)b
	group by CedulaVendedor,NombreVendedor,CodigoCentro,NombreCentro,CodigoMarcaGrupo,MarcaGrupo,CodigoMarcaCI,MarcaCI,Julio,Agosto,Septiembre,Octubre,Noviembre,Diciembre,Enero,Febrero,Marzo,Abril,Mayo,Junio
)c

group by orden,CedulaVendedor,NombreVendedor,CodigoCentro,NombreCentro,CodigoMarcaGrupo,MarcaGrupo,CodigoMarcaCI,MarcaCI

```

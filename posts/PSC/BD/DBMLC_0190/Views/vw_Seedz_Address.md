# View: vw_Seedz_Address

## Usa los objetos:
- [[spiga_ContabilidadMovimientos]]
- [[vw_Seedz_Informacion_Terceros]]
- [[vw_TercerosDireccionesUltimaFechaActualizacion]]

```sql

CREATE VIEW [dbo].[vw_Seedz_Address]  AS 
SELECT 
ISNULL(ROW_NUMBER() OVER(ORDER BY (SELECT dataCadastro)), 0) Id_, -- JCS: 2023/02/09 PARA PODERLO MAPEAR EN EL ENTITY

Num=ROW_NUMBER() over(order by cnpjOrigemDados  asc),
cnpjOrigemDados, ROW_NUMBER() OVER(ORDER BY idCliente) AS id, dataCadastro, dataAtualizacao, idCliente, documentoCliente, Tipo
 FROM (
	 SELECT DISTINCT cnpjOrigemDados='830004993-8', idCliente=cod, 
	 
	 --JCS:2024|08|30 - AJUSTE FORMATO FECHAS
	 --dataCadastro=FORMAT(c.FechaAlta, 'dd/MM/yyyy hh:mm:ss'), 
	 --dataAtualizacao=FORMAT(c.FechaMod, 'dd/MM/yyyy hh:mm:ss'), 
	 dataCadastro=c.FechaAlta, 
	 dataAtualizacao=c.FechaMod, 
	 
	 
	 documentoCliente=c.NifCif, 
	 Tipo= CASE WHEN d.FkDireccionTipos = 1 THEN 'Casa/apartamento'
				WHEN d.FkDireccionTipos = 2 THEN 'Oficina'
				WHEN d.FkDireccionTipos = 3 THEN 'Otra'
				WHEN d.FkDireccionTipos = 4 THEN 'Finca' END
	   FROM(
					 SELECT cod= a.CodigoTercero 
					 FROM [PSCService_DB].dbo.spiga_ContabilidadMovimientos a					  
					 LEFT JOIN vw_Seedz_Informacion_Terceros				b ON b.PkTerceros=a.CodigoTercero
					 WHERE a.TipoFactura='E' AND a.IdEmpresas = 1 AND a.NombreCentro LIKE 'JD%' AND a.CodigoTercero IS NOT NULL
	 )b
	 LEFT JOIN vw_Seedz_Informacion_Terceros c ON b.cod =c.PkTerceros
	 LEFT JOIN vw_TercerosDireccionesUltimaFechaActualizacion d ON b.cod =d.PkFkTerceros 
)a

```

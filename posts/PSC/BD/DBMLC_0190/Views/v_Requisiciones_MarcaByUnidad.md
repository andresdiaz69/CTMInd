# View: v_Requisiciones_MarcaByUnidad

## Usa los objetos:
- [[VehiculosMarcas]]
- [[vw_UnidadDeNegocio]]

```sql

CREATE VIEW [dbo].[v_Requisiciones_MarcaByUnidad] AS
SELECT  DISTINCT ISNULL(CAST((ROW_NUMBER() OVER(ORDER BY A.UnidadNegocio_Requisicion)) AS INT),0) AS Id,
		CodUnidadNegocio = a.UnidadNegocio_Requisicion,				NombreUnidadNegocio = a.NombreUnidadNegocio_Requisicion, 
		CodMarca = a.CodigoMarcaSpigaValido,						NombreMarca = b.Marca
FROM 
(
	SELECT a.*, b.CodigoMarca, b.CodigoMarcaSpigaValido, b.Marca 
	FROM 
	(
		SELECT DISTINCT UnidadNegocio_Requisicion, NombreUnidadNegocio_Requisicion 
		FROM vw_UnidadDeNegocio 
		WHERE UnidadNegocio_Requisicion IS NOT NULL
	)a
	LEFT JOIN VehiculosMarcas b ON a.UnidadNegocio_Requisicion = b.CodigoMarca
)a
LEFT JOIN VehiculosMarcas b ON a.CodigoMarcaSpigaValido = b.CodigoMarca

```

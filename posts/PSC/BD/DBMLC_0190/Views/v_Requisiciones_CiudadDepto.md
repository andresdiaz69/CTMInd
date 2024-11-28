# View: v_Requisiciones_CiudadDepto

## Usa los objetos:
- [[gen_ciudad]]
- [[gen_deptos]]

```sql

CREATE VIEW [dbo].[v_Requisiciones_CiudadDepto] AS
SELECT Id, CodigoPais, CodigoCiudad, NombreCiudad, CodigoDepartamento, NombreDepartamento
FROM
(
	SELECT	DISTINCT ISNULL(CAST((ROW_NUMBER() OVER(ORDER BY NC.cod_ciu)) AS INT),0) AS Id,
			CodigoPais   = LTRIM(RTRIM(CONVERT(NVARCHAR(10),NC.cod_pai))),
			CodigoCiudad = LTRIM(RTRIM(CONVERT(NVARCHAR(10),NC.cod_ciu))),
			NombreCiudad = LTRIM(RTRIM(REPLACE(REPLACE(REPLACE(CONVERT(NVARCHAR(100),NC.nom_ciu),' ','<>'),'><',''),'<>',' '))),
			CodigoDepartamento = LTRIM(RTRIM(CONVERT(NVARCHAR(10),NC.cod_dep))),
			NombreDepartamento = LTRIM(RTRIM(REPLACE(REPLACE(REPLACE(CONVERT(NVARCHAR(100),ND.nom_dep),' ','<>'),'><',''),'<>',' ')))
	FROM [Novasoft_CT_MM].[dbo].[gen_ciudad] AS NC
	LEFT JOIN [Novasoft_CT_MM]..[gen_deptos] AS ND ON ND.cod_pai = NC.cod_pai 
													AND ND.cod_dep = NC.cod_dep
) A

```

# View: v_Requisiciones_ConsultaSalarioBasico

## Usa los objetos:
- [[Requisiciones_SalarioBasico]]
- [[v_Requisiciones_CargosVigentes]]
- [[vw_UnidadDeNegocio]]

```sql

CREATE VIEW [dbo].[v_Requisiciones_ConsultaSalarioBasico] AS
SELECT CodigoCargo, NombreCargo, CodTipoSalario, TipoSalario, CodigoMarca, NombreMarca, Salario, Activo
FROM 
(
	SELECT DISTINCT S.CodigoCargo, C.NombreCargo, 
		CASE WHEN S.TipoSalario LIKE '%variab%' THEN 1 
			WHEN S.TipoSalario LIKE '%fijo%' THEN 2 ELSE 0 END AS CodTipoSalario,
		S.TipoSalario, S.CodigoMarca, UPPER(U.NombreUnidadNegocio_Requisicion) NombreMarca, S.Salario, S.Activo
	FROM Requisiciones_SalarioBasico AS s
	LEFT JOIN vw_UnidadDeNegocio AS U ON S.CodigoMarca = U.UnidadNegocio_Requisicion
	LEFT JOIN v_Requisiciones_CargosVigentes AS C ON C.CodigoCargo = S.CodigoCargo
) A
WHERE NombreCargo IS NOT NULL

```

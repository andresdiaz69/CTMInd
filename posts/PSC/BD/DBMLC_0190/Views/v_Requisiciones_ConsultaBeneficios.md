# View: v_Requisiciones_ConsultaBeneficios

## Usa los objetos:
- [[Requisiciones_TipoBeneficios]]
- [[Requisiciones_ValorBeneficios]]
- [[v_Requisiciones_CargosVigentes]]
- [[vw_UnidadDeNegocio]]

```sql

CREATE VIEW [dbo].[v_Requisiciones_ConsultaBeneficios] AS
SELECT CodigoCargo, NombreCargo, CodigoBeneficio, NombreBeneficio, CodigoMarca, NombreMarca, Valor, Activo
FROM
(
	SELECT DISTINCT VB.CodigoCargo, C.NombreCargo, VB.CodigoBeneficio, TB.NombreBeneficio, VB.CodigoMarca, 
		UPPER(U.NombreUnidadNegocio_Requisicion) NombreMarca, VB.Valor, VB.Activo
	FROM Requisiciones_ValorBeneficios AS VB
	LEFT JOIN vw_UnidadDeNegocio AS U ON VB.CodigoMarca = U.UnidadNegocio_Requisicion
	LEFT JOIN Requisiciones_TipoBeneficios AS TB ON TB.IdBeneficio = VB.CodigoBeneficio
	LEFT JOIN v_Requisiciones_CargosVigentes AS C ON C.CodigoCargo = VB.CodigoCargo
) A
WHERE NombreCargo IS NOT NULL

```

# View: vw_Presupuestos_Variables_PorCentros

## Usa los objetos:
- [[Presupuestos_Clases]]
- [[Presupuestos_VariablesCategorias]]
- [[Presupuestos_VariablesParametrizacionesPorCentros]]
- [[Presupuestos_VariablesSubCategorias]]
- [[Presupuestos_VariablesTipos]]
- [[vw_Presupuestos_CentrosPorLinea]]

```sql


/****************************
-- Modificación: JUAN CARLOS SÁNCHEZ
-- Date: 2024|10|07
-- Descripción: Ya no se necesita cruzar con la tabla: Presupuestos_PresentacionesVsLinea
-- Modificación: JHON CARLOS HERNÁNDEZ G.
-- Date 2024|10|24 
-- Descripción:Se reemplaza DBMLC_0190.dbo.UnidadDeNegocio por la 
-- Vista vw_Presupuestos_CentrosPorLinea para que pueda traer las lineas y centro de Mayorista
****************************/


CREATE VIEW [dbo].[vw_Presupuestos_Variables_PorCentros]
AS
SELECT CodigoLinea, NombreUnidadNegocio NombrePresentacion, CodigoCentro, NombreCentro NombreSede, Categoria, IdSubCategoria, SubCategoria, IdTipo, Variable = Tipo, UnidadDeMedida, [Expansión], [Base], [Contracción], [AñoMas1], [AñoMas2], Ano_Periodo, Mes_Periodo
FROM (
    SELECT vt.IdTipo, un.NombreCentro,  vt.Tipo, vt.UnidadDeMedida, pc.Clase, vpc.Valor, pvsc.IdSubCategoria, pvsc.SubCategoria, pvc.Categoria, vpc.Ano_Periodo, vpc.Mes_Periodo,
	vpc.CodigoCentro, un.CodUnidadNegocio, un.NombreUnidadNegocio, 
	
	--ppvl.CodigoLinea
	ISNULL(CAST(un.CodUnidadNegocio AS smallint), 0) AS CodigoLinea

    FROM Presupuestos_VariablesTipos vt
    INNER JOIN Presupuestos_VariablesParametrizacionesPorCentros vpc
        ON vt.IdTipo = vpc.IdTipo
    INNER JOIN Presupuestos_Clases pc 
        ON vpc.IdClase = pc.IdClase
    INNER JOIN Presupuestos_VariablesSubCategorias pvsc 
        ON pvsc.IdSubCategoria = vt.IdSubCategoria
	INNER JOIN Presupuestos_VariablesCategorias pvc 
	    ON pvc.IdCategoria = pvsc.IdCategoria

	INNER JOIN vw_Presupuestos_CentrosPorLinea un  
	--DBMLC_0190.dbo.UnidadDeNegocio un
	    ON un.CodCentro = vpc.CodigoCentro

	--INNER JOIN Presupuestos_PresentacionesVsLineas ppvl
	--   ON un.CodUnidadNegocio = ppvl.CodigoLinea

	WHERE Activar = 1
) AS SourceTable
PIVOT (
    MAX(Valor)
    FOR Clase IN ([AñoMas1], [AñoMas2], [Base], [Contracción], [Expansión])
) AS PivotTable
--WHERE CodUnidadNegocio = 22 and CodigoCentro = 69

```

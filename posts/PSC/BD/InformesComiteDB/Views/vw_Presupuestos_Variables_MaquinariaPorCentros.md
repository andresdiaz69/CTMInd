# View: vw_Presupuestos_Variables_MaquinariaPorCentros

## Usa los objetos:
- [[Presupuestos_Clases]]
- [[Presupuestos_Maquinaria_Categoria]]
- [[Presupuestos_VariablesCategorias]]
- [[Presupuestos_VariablesParametrizacionesMaquinariaPorCentros]]
- [[Presupuestos_VariablesSubCategorias]]
- [[Presupuestos_VariablesTipos]]
- [[vw_Presupuestos_CentrosPorLinea]]

```sql

CREATE VIEW [dbo].[vw_Presupuestos_Variables_MaquinariaPorCentros]

-- =============================================
-- Control de Cambios
-- 2024|10|31 - Wilder Chacón - Creado para listar las parametrizaciones de maquinaria  por centro
-- Modulo - Presupuestos
-- =============================================

AS
SELECT  CodigoLinea,			Linea,						CodigoCentro,			
		Centro,					IdCategoriaMaquinaria,		CategoriaMaquinaria,
		Categoria,				IdSubCategoria,				SubCategoria,
		IdTipo,					Variable = Tipo,			UnidadDeMedida, 
		Expansión,				Base,						Contracción, 
		AñoMas1,				AñoMas2,					Ano_Periodo, 
		Mes_Periodo
FROM (
    SELECT  vt.IdTipo,				cl.NombreCentro				Centro,		
			vt.Tipo,				vt.UnidadDeMedida,			pc.Clase,	
			vpc.Valor,				pvsc.IdSubCategoria,		pvsc.SubCategoria,
			pvc.Categoria, 			vpc.Ano_Periodo,			vpc.Mes_Periodo,
			vpc.CodigoCentro, 		cl.NombreUnidadNegocio		Linea,	
			pmc.IdCategoria			IdCategoriaMaquinaria, 		pmc.NombreCategoria CategoriaMaquinaria,	
			ISNULL(CAST(cl.CodUnidadNegocio AS smallint), 0) AS CodigoLinea

    FROM Presupuestos_VariablesTipos vt
    INNER JOIN Presupuestos_VariablesParametrizacionesMaquinariaPorCentros vpc
        ON vt.IdTipo = vpc.IdTipo
    INNER JOIN Presupuestos_Clases pc 
        ON vpc.IdClase = pc.IdClase
    INNER JOIN Presupuestos_VariablesSubCategorias pvsc 
        ON pvsc.IdSubCategoria = vt.IdSubCategoria
	INNER JOIN Presupuestos_VariablesCategorias pvc 
	    ON pvc.IdCategoria = pvsc.IdCategoria
	INNER JOIN vw_Presupuestos_CentrosPorLinea cl  
	    ON  cl.CodCentro = vpc.CodigoCentro 
		AND cl.CodUnidadNegocio = vpc.CodigoLinea
	INNER JOIN  Presupuestos_Maquinaria_Categoria pmc
	    ON pmc.IdCategoria = vpc.IdCategoria
		
	WHERE Activar = 1 --AND CodigoCentro = 124
) AS SourceTable
PIVOT (
    MAX(Valor)
    FOR Clase IN ([AñoMas1], [AñoMas2], [Base], [Contracción], [Expansión])
) AS PivotTable

```

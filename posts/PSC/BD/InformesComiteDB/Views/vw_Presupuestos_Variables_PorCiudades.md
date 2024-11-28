# View: vw_Presupuestos_Variables_PorCiudades

## Usa los objetos:
- [[gen_ciudad]]
- [[Presupuestos_Clases]]
- [[Presupuestos_VariablesCategorias]]
- [[Presupuestos_VariablesParametrizacionesPorCiudades]]
- [[Presupuestos_VariablesSubCategorias]]
- [[Presupuestos_VariablesTipos]]

```sql
CREATE VIEW [dbo].[vw_Presupuestos_Variables_PorCiudades]
AS
SELECT CodigoCiudad, nom_ciu NombreCiudad, IdTipo, Categoria, IdSubCategoria, SubCategoria, Variable = Tipo, UnidadDeMedida, [Expansión], [Base], [Contracción], [AñoMas1], [AñoMas2], Ano_Periodo
FROM (
    SELECT vt.IdTipo, vpc.CodigoCiudad, nc.nom_ciu, vt.Tipo, vt.UnidadDeMedida, pc.Clase, vpc.Valor, pvsc.IdSubCategoria, pvsc.SubCategoria, pvc.Categoria, vpc.Ano_Periodo
    FROM Presupuestos_VariablesTipos vt
    INNER JOIN Presupuestos_VariablesParametrizacionesPorCiudades vpc
        ON vt.IdTipo = vpc.IdTipo
    INNER JOIN Presupuestos_Clases pc 
        ON vpc.IdClase = pc.IdClase
    INNER JOIN Presupuestos_VariablesSubCategorias pvsc 
        ON pvsc.IdSubCategoria = vt.IdSubCategoria
	INNER JOIN Presupuestos_VariablesCategorias pvc 
	    ON pvc.IdCategoria = pvsc.IdCategoria
	INNER JOIN [Novasoft_CT_MM].[dbo].[gen_ciudad] nc
	    ON vpc.CodigoCiudad = CONVERT(INT, nc.cod_ciu)
		where nc.cod_pai = 057 
		AND Activar = 1
) AS SourceTable
PIVOT (
    MAX(Valor)
    FOR Clase IN ([AñoMas1], [AñoMas2], [Base], [Contracción], [Expansión])
) AS PivotTable

```

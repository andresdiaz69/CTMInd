# View: vw_Presupuestos_Variables_PorModelos

## Usa los objetos:
- [[Presupuestos_Clases]]
- [[Presupuestos_Maquinaria_Categoria]]
- [[Presupuestos_VariablesCategorias]]
- [[Presupuestos_VariablesParametrizacionesPorModelos]]
- [[Presupuestos_VariablesSubCategorias]]
- [[Presupuestos_VariablesTipos]]
- [[vw_Presupuestos_Centros]]
- [[vw_Presupuestos_ModelosPreciosImpuestos]]

```sql
CREATE VIEW [dbo].[vw_Presupuestos_Variables_PorModelos] AS
-- =============================================
-- Control de Cambios
-- 2024|10|29 - Alexis Barreto - Se agregan las columnas Porcentaje_Consignacion y UsadosConsignacion
-- Modulo - Presupuestos
-- =============================================

SELECT	vppg.Ano_Periodo,						vppg.Mes_Periodo,				pcen.CodUnidadNegocio CodigoLinea,				
		pcen.NombreUnidadNegocio NombreLinea, 	vppg.CodigoCentro,				pcen.NombreCentro,	
		pmpi.CodigoGama,						pmpi.Gama,						vppg.IdClase,
		pc.Clase,								vppg.IdTipo,					vt.Tipo,
		vsc.IdSubCategoria,						vsc.SubCategoria,				vc.Categoria,
		vppg.CodigoModelo,						pmpi.Modelo,					vppg.Valor,
		pmpi.IVA,								pmpi.Impoconsumo,				pmpi.IdCategoriaMaquinaria,
		pmc.NombreCategoria,					pmpi.Porcentaje_Consignacion, 	pmpi.UsadosConsignacion

FROM Presupuestos_VariablesParametrizacionesPorModelos vppg
join Presupuestos_VariablesTipos				vt	on vt.IdTipo = vppg.IdTipo
join Presupuestos_Clases						pc	on pc.IdClase = vppg.IdClase
join Presupuestos_VariablesSubCategorias		vsc on vsc.IdSubCategoria = vt.IdSubCategoria
join Presupuestos_VariablesCategorias			vc	on vc.IdCategoria = vsc.IdCategoria
join vw_Presupuestos_Centros					pcen on pcen.CodCentro = vppg.CodigoCentro
join vw_Presupuestos_ModelosPreciosImpuestos	pmpi on pmpi.CodigoLinea = pcen.CodUnidadNegocio 
		                                            and pmpi.CodigoModelo = vppg.CodigoModelo 
													and pmpi.AplicaPresupuesto = 1
													and pmpi.anopresupuesto = Ano_Periodo
													and pmpi.idclase  = vppg.IdClase
													and pmpi.UsadosConsignacion = (case when vppg.IdTipo = 170 then 1 else 0 end)
left Join Presupuestos_Maquinaria_Categoria pmc on pmc.IdCategoria = pmpi.IdCategoriaMaquinaria 

```

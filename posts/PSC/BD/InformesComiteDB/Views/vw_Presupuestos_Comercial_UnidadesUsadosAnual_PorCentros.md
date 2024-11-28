# View: vw_Presupuestos_Comercial_UnidadesUsadosAnual_PorCentros

## Usa los objetos:
- [[Presupuestos_Clases]]
- [[Presupuestos_VariablesCategorias]]
- [[Presupuestos_VariablesParametrizacionesPorCentros]]
- [[Presupuestos_VariablesParametrizacionesPorLineas]]
- [[Presupuestos_VariablesSubCategorias]]
- [[Presupuestos_VariablesTipos]]
- [[UnidadDeNegocio]]

```sql

CREATE VIEW [dbo].[vw_Presupuestos_Comercial_UnidadesUsadosAnual_PorCentros] 

AS

select	vpc.Ano_Periodo,	vpc.CodigoLinea,			vpc.NombrePresentacion, 
		vpc.CodigoCentro,	vpc.NombreSede,		        vpc.IdClase,
		vpc.IdTipo IdTipo1,	vpc.Variable Variable1,		vpc.UnidadDeMedida UnidadDeMedida1,		vpc.valor ParticipacionCentro,
		vpl.IdTipo IdTipo2,	vt.tipo Variable2,		    vt.UnidadDeMedida UnidadDeMedida2,		vpl.valor UnidadesUsados,
		vpc.valor / 100 * vpl.valor						TotalAnual

from (SELECT distinct x.CodigoLinea,       NombreUnidadNegocio NombrePresentacion,   x.CodigoCentro, 
		     NombreCentro NombreSede,      Categoria, 					             x.IdSubCategoria, 
			 x.SubCategoria,               x.IdTipo, 					             Variable = Tipo, 
			 x.UnidadDeMedida,             x.valor, 					             x.idclase,
			 Clase    ,                    x.Ano_Periodo, 				             x.Mes_Periodo						
       FROM (SELECT vt.IdTipo,           un.NombreCentro,        vt.Tipo,             vt.UnidadDeMedida, 
			        pc.Clase,            vpc.Valor,              pvsc.IdSubCategoria, pvsc.SubCategoria, 
				    pvc.Categoria,       vpc.Ano_Periodo,        vpc.Mes_Periodo,     vpc.CodigoCentro,
				    un.CodUnidadNegocio, un.NombreUnidadNegocio, vpc.idclase,	
				    ISNULL(CAST(un.CodUnidadNegocio AS smallint), 0)  CodigoLinea                   
               FROM Presupuestos_VariablesTipos vt
              INNER JOIN Presupuestos_VariablesParametrizacionesPorCentros vpc     ON vt.IdTipo = vpc.IdTipo
              INNER JOIN Presupuestos_Clases pc       ON vpc.IdClase = pc.IdClase
              INNER JOIN Presupuestos_VariablesSubCategorias pvsc  ON pvsc.IdSubCategoria = vt.IdSubCategoria
              INNER JOIN Presupuestos_VariablesCategorias pvc     ON pvc.IdCategoria = pvsc.IdCategoria                   
              INNER JOIN  DBMLC_0190.dbo.UnidadDeNegocio un  	 ON un.CodCentro = vpc.CodigoCentro                                 
              WHERE Activar = 1) x
			 ) vpc
	    join Presupuestos_VariablesParametrizacionesPorLineas vpl  ON vpl.Ano_Periodo = vpc.Ano_Periodo 
		                                                          and vpl.CodigoLinea = vpc.CodigoLinea 
		                                                          and vpl.IdTipo      = 121
																  and vpl.IdClase     = vpc.IdClase-- 'Unidades Usados' 
        join Presupuestos_VariablesTipos vt on vt.IdTipo = vpl.IdTipo
       where vpc.IdTipo = 124 -- % Participación Centro -- Unidades Usados
	    -- and vpc.IdSubCategoria = 16   
		  


```

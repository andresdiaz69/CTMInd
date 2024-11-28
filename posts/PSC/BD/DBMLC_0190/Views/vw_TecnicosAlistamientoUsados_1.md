# View: vw_TecnicosAlistamientoUsados_1

## Usa los objetos:
- [[ComisionesModelosSub]]
- [[ComisionesSpigaTallerPorOT]]
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[RangosMaestras]]
- [[vw_RangosMaestrasFull]]
- [[vw_RangosVersionesMaxSub]]

```sql
CREATE VIEW [dbo].[vw_TecnicosAlistamientoUsados_1] AS
SELECT EMPLEADOS.CodigoEmpleado, EMPLEADOS.Nombres, CANTIDAD.Ano, CANTIDAD.Mes, EMPLEADOS.IdRangoMaestra, EMPLEADOS.NombreMaestra, EMPLEADOS.IdRangoVersionMax, EMPLEADOS.IdComisionModeloSub, EMPLEADOS.IdComisionModeloSubCriterio
,vw_RangosMaestrasFull.IdRangoVersion,vw_RangosMaestrasFull.ConsecutivoVersion,vw_RangosMaestrasFull.IdRangoDetalle, CANTIDAD.Cantidad,vw_RangosMaestrasFull.Desde,vw_RangosMaestrasFull.Hasta
, ISNULL(vw_RangosMaestrasFull.Valor,0) AS ValorRango, CANTIDAD.Cantidad * ISNULL(vw_RangosMaestrasFull.Valor,0) AS ValorComision
, vw_RangosMaestrasFull.CodigoConcepto

FROM
(
	SELECT Empleados1.CodigoEmpleado,Empleados1.Nombres +' '+Empleados1.Apellido1+' '+Empleados1.Apellido2 AS Nombres, vw_RangosVersionesMaxSub.IdRangoMaestra, RangosMaestras.NombreMaestra,vw_RangosVersionesMaxSub.IdRangoVersionMax, vw_RangosVersionesMaxSub.IdComisionModeloSub, vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio
	FROM EmpleadosRangosMaestras
	INNER JOIN Empleados AS Empleados1  ON EmpleadosRangosMaestras.CodigoEmpleado = Empleados1.CodigoEmpleado
	INNER JOIN vw_RangosVersionesMaxSub ON EmpleadosRangosMaestras.IdRangoMaestra = vw_RangosVersionesMaxSub.IdRangoMaestra
	LEFT JOIN ComisionesModelosSub ON vw_RangosVersionesMaxSub.IdComisionModeloSub = ComisionesModelosSub.IdComisionModeloSub
	LEFT JOIN RangosMaestras ON vw_RangosVersionesMaxSub.IdRangoMaestra = RangosMaestras.IdRangoMaestra
	WHERE 
		
	((vw_RangosVersionesMaxSub.IdComisionModeloSub = 72) AND (vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio = 137))
	OR
	((vw_RangosVersionesMaxSub.IdComisionModeloSub = 93) AND (vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio = 174))

)AS EMPLEADOS
CROSS JOIN 
(
	--select Ano_Spiga AS Ano,Mes_Spiga AS Mes ,CodigoEmpresa,Empresa,CodigoCentro,Centro,
	--CodigoSeccion,seccion,cantidad = sum(cantidad)
	--from(
	--			 select  distinct Ano_Spiga,Mes_Spiga,CodigoEmpresa,Empresa,CodigoCentro,
	--			 Centro,CodigoSeccion,seccion,placa,
	--			 cantidad = 1 --case when Valorneto > 0 then 1 else -1 end
	--			 from ComisionesSpigaTallerPorOT
	--			 where (CodigoCentro = 135 and TipoIntCargo = 'I') or (CodigoCentro = 144)
	--)a
	--group by Ano_Spiga,Mes_Spiga,CodigoEmpresa,Empresa,CodigoCentro,Centro,CodigoSeccion,seccion


	-- JCS: 2023/05/09 - ES NECESARIO HACERLO DE ESTA FORMA PQ EL CENTRO Y/O SECCIÓN PUEDEN CAMBIAR DE NOMBRE EN EL MISMO PERÍODO
   select Ano_Spiga AS Ano,Mes_Spiga AS Mes ,CodigoEmpresa,Empresa,CodigoCentro,MAX(Centro) AS Centro,
	CodigoSeccion,MAX(seccion) AS seccion,cantidad = sum(cantidad)
	from(
				 select  distinct Ano_Spiga,Mes_Spiga,CodigoEmpresa,Empresa,CodigoCentro,
				 Centro,CodigoSeccion,seccion,placa,Valorneto=sum(Valorneto),
				 cantidad = case	when sum(Valorneto) = 0 then 0 
									when sum(Valorneto) < 0 then -1 
									else 1 end
				 from ComisionesSpigaTallerPorOT
				 where ((CodigoCentro = 135 and TipoIntCargo = 'I') or (CodigoCentro = 144))
				-- and  Ano_Spiga = 2023
				--and Mes_Spiga = 11
				group by  Ano_Spiga,Mes_Spiga,CodigoEmpresa,Empresa,CodigoCentro,Centro,CodigoSeccion,seccion,placa
	)a
--where Ano_Spiga = 2023
--and Mes_Spiga = 11
group by Ano_Spiga,Mes_Spiga,CodigoEmpresa,Empresa,CodigoCentro,CodigoSeccion
)AS CANTIDAD 
LEFT JOIN vw_RangosMaestrasFull ON EMPLEADOS.IdRangoVersionMax = vw_RangosMaestrasFull.IdRangoVersion
WHERE (vw_RangosMaestrasFull.Desde < CANTIDAD.Cantidad) AND (vw_RangosMaestrasFull.Hasta >= CANTIDAD.Cantidad)

```

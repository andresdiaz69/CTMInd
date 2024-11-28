# View: vw_cMandos_Actividades

## Usa los objetos:
- [[EmpleadosActivos]]
- [[EmpleadosRetirados]]
- [[spiga_Empleados]]
- [[spiga_SeguimientoActividadesVendedores]]

```sql

CREATE VIEW [dbo].[vw_cMandos_Actividades]
AS
SELECT        EA.CodigoEmpresa, EA.codigo_centro CodigoCentro, SUM(AV.Actividades) AS Actividades,AV.Ano_Periodo,AV.Mes_Periodo
FROM            (SELECT        IdEmpleados, SUM(NumPasosRealizados) AS Actividades,Ano_Periodo,Mes_Periodo
				FROM            PSCService_DB.dbo.spiga_SeguimientoActividadesVendedores
				GROUP BY IdEmpleados,Ano_Periodo,Mes_Periodo) AS AV 
				LEFT OUTER JOIN
                (SELECT        IdEmpleados, NifCif
                FROM            PSCService_DB.dbo.spiga_Empleados
                GROUP BY IdEmpleados, NifCif) AS SE ON AV.IdEmpleados = SE.IdEmpleados 
				LEFT OUTER JOIN
                (SELECT        CodigoEmpleado, CodigoEmpresa, codigo_centro,Ano_Periodo,Mes_Periodo
					FROM            dbo.EmpleadosActivos
					GROUP BY CodigoEmpresa, codigo_centro, CodigoEmpleado,Ano_Periodo,Mes_Periodo
					UNION
					SELECT        CodigoEmpleado, CodigoEmpresa, codigo_centro,Ano_Periodo,Mes_Periodo
					FROM            dbo.EmpleadosRetirados
					GROUP BY CodigoEmpresa, codigo_centro, CodigoEmpleado,Ano_Periodo,Mes_Periodo
				) AS EA ON SE.NifCif = EA.CodigoEmpleado and EA.Ano_periodo = AV.Ano_Periodo and EA.Mes_Periodo = AV.Mes_Periodo
WHERE        (EA.CodigoEmpresa IS NOT NULL)
GROUP BY EA.CodigoEmpresa, EA.codigo_centro,AV.Ano_Periodo,AV.Mes_Periodo


```

# View: vw_RepuestosV2_Bolsas_Administrativa_1

## Usa los objetos:
- [[Periodos]]
- [[vw_EmpleadosRangosMaestras]]

```sql




CREATE VIEW [dbo].[vw_RepuestosV2_Bolsas_Administrativa_1]
AS
SELECT        dbo.Periodos.Ano_Periodo, dbo.Periodos.Mes_Periodo, EMPLEADOS.CodigoEmpleado, EMPLEADOS.CedulaVendedorRepuestos, EMPLEADOS.Empleado, EMPLEADOS.FechaRetiro, EMPLEADOS.CodigoEmpresa, EMPLEADOS.NombreEmpresa, EMPLEADOS.CodigoCargo, 
                         EMPLEADOS.NombreCargo, EMPLEADOS.cod_marca, EMPLEADOS.nombre_marca, EMPLEADOS.CodigoCentro, EMPLEADOS.NombreCentro
FROM            (SELECT        CodigoEmpleado, CodigoEmpleado AS CedulaVendedorRepuestos, Empleado, FechaRetiro, CodigoEmpresa, NombreEmpresa, CodigoCargo, NombreCargo, cod_marca, nombre_marca, CodigoCentro, NombreCentro
                          FROM            dbo.vw_EmpleadosRangosMaestras
						  -- MAESTRAS DE BOLSA ADMINISTRATIVA - SUBCRITERIOS: 108 y 114
                          WHERE        (IdRangoMaestra IN (290, 291))) AS EMPLEADOS CROSS JOIN
                         dbo.Periodos

						 -- JCS: 02/05/2023 -- PARA EXCLUIR LOS EMPLEADOS RETIRADOS, PERO SE DEBEN TENER EN CUENTA LOS QUE SE RETIRARON EN EL MISMO PERÍODO
						 WHERE FechaRetiro IS NULL OR (Ano_Periodo = YEAR(FechaRetiro) AND Mes_Periodo = MONTH(FechaRetiro))

```

# View: vw_ClubIntegralPosventaJT_Ticket

## Usa los objetos:
- [[ClubIntegralJefeDeTallerTicketEntrada]]
- [[v_ClubIntegral_empleados]]

```sql
CREATE VIEW [dbo].[vw_ClubIntegralPosventaJT_Ticket] AS
select  CodigoEmpleado,Nombres,CodigoCentro,NombreCentro,CodigoMarca,Marca,IdCLubIntegralModeloSub,NombreModeloSub,Ano,Trimestre,SatisfaccionGlobal,Resultado

from
(
select t.CodigoEmpleado,e.Nombres,e.CodigoCentro,e.NombreCentro,t.CodigoMarca,e.Marca,t.IdCLubIntegralModeloSub,e.NombreModeloSub,t.Ano,t.Trimestre,t.SatisfaccionGlobal

,CASE 
--MAZDA
WHEN t.CodigoMarca ='22' and t.SatisfaccionGlobal>= 93.5 THEN 'pasa' 
--FORD
WHEN t.CodigoMarca = '12' and t.CodigoEmpleado = '1057571982' and t.SatisfaccionGlobal  >=77 THEN 'pasa'
WHEN t.CodigoMarca = '12' and t.CodigoEmpleado = '80544545' and t.SatisfaccionGlobal >=77 THEN 'pasa'
WHEN t.CodigoMarca = '12' and t.CodigoEmpleado = '1015402110' and t.SatisfaccionGlobal >=77 THEN 'pasa'
WHEN t.CodigoMarca = '12' and t.CodigoEmpleado = '80794043' and t.SatisfaccionGlobal >=77 THEN 'pasa'
WHEN t.CodigoMarca = '12' and t.CodigoEmpleado = '79869174' and t.SatisfaccionGlobal >=85 THEN 'pasa'
						  
--VOLKSWAGEN                              
WHEN t.CodigoMarca = '2' and t.SatisfaccionGlobal >= 90.0 THEN 'pasa'
--RENAULT                                 
WHEN t.CodigoMarca = '19' and t.CodigoEmpleado = '79394631' and t.SatisfaccionGlobal >=69.0 THEN 'pasa'
WHEN t.CodigoMarca = '19' and t.CodigoEmpleado = '79494279' and t.SatisfaccionGlobal >=68.0 THEN 'pasa'
WHEN t.CodigoMarca = '19' and t.CodigoEmpleado = '65744591' and t.SatisfaccionGlobal >=74.0 THEN 'pasa'
WHEN t.CodigoMarca = '19' and t.CodigoEmpleado = '80829049' and t.SatisfaccionGlobal >=71.8 THEN 'pasa'
WHEN t.CodigoMarca = '19' and t.CodigoEmpleado = '19421858' and t.SatisfaccionGlobal >=71.0 THEN 'pasa'
WHEN t.CodigoMarca = '19' and t.CodigoEmpleado = '1026550948' and t.SatisfaccionGlobal >=74.0 THEN 'pasa'
--Mitsubishi
WHEN t.CodigoMarca = '20' and t.SatisfaccionGlobal >= 95.0 THEN 'pasa'
--DAIMLER
WHEN t.CodigoMarca = '1' and t.SatisfaccionGlobal >=80.0 THEN 'pasa'
WHEN t.CodigoMarca = '3' and t.SatisfaccionGlobal >=80.0 THEN 'pasa'
ELSE 'no_pasa' END AS Resultado

from ClubIntegralJefeDeTallerTicketEntrada t 
left join v_ClubIntegral_empleados e on t.CodigoEmpleado = e.CodigoEmpleado  and t.IdCLubIntegralModeloSub = e.IdCLubIntegralModeloSub and t.CodigoMarca = e.CodigoMarca

)a

```

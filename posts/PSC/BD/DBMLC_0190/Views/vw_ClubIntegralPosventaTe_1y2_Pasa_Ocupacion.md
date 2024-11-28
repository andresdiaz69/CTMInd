# View: vw_ClubIntegralPosventaTe_1y2_Pasa_Ocupacion

## Usa los objetos:
- [[ClubIntegralTecnicos1y2]]
- [[v_ClubIntegral_empleados]]
- [[vw_ClubIntegralRangoMaestrasVersionMax]]

```sql
CREATE VIEW [dbo].[vw_ClubIntegralPosventaTe_1y2_Pasa_Ocupacion] AS

SELECT distinct t.CodigoEmpleado,e.Nombres,t.CodigoMarca,e.Marca,e.CodigoMarcaGrupo,e.MarcaGrupo,t.Ano,t.Trimestre,t.Ocupacion,vm.IdRangoMaestra,vm.IdRangoVersionMax
FROM ClubIntegralTecnicos1y2 t
left join vw_ClubIntegralRangoMaestrasVersionMax  vm on t.CodigoEmpleado = vm.CodigoEmpleado
left join v_ClubIntegral_empleados e	on t.CodigoEmpleado = e.CodigoEmpleado 
where IdRangoMaestra ='15'




```

# View: vw_ClubIntegralPosventaAS_Calculo_Puntos_Total

## Usa los objetos:
- [[vw_ClubIntegralPosventaAS_Calculo_Puntos_Satisfaccion]]
- [[vw_ClubIntegralPosventaAS_Ticket]]
- [[vw_ClubIntegralPosventaASC_Calculo_Puntos_Facturacion]]
- [[vw_ClubIntegralPosventaASM_Calculo_Puntos_Facturacion]]

```sql
CREATE VIEW [dbo].[vw_ClubIntegralPosventaAS_Calculo_Puntos_Total] AS

select CodigoEmpleado,Nombres,IdCLubIntegralModeloSub,NombreModeloSub,CodigoMarca,Marca,CodigoMarcaGrupo,MarcaGrupo,CodigoCentro,NombreCentro,Ano,Trimestre,Calidad_Informacion,Resultado,Satisfaccion,PuntosSatisfaccion,FacturacionMecanica,PuntosFacturacionMecanica
,FacturacionColision,PuntosFacturacionColision
,(PuntosFacturacionMecanica+PuntosFacturacionColision+PuntosSatisfaccion)PuntosTotal
from 
(
	select t.CodigoEmpleado,t.Nombres,t.IdCLubIntegralModeloSub,t.NombreModeloSub,t.CodigoMarca,t.Marca,t.CodigoMarcaGrupo,t.MarcaGrupo,t.CodigoCentro,t.NombreCentro
	,t.Ano,t.Trimestre,t.Calidad_Informacion,t.Resultado,isnull(s.Satisfaccion,0)Satisfaccion,isnull(s.Puntos,0)PuntosSatisfaccion
	,isnull(fm.Ticket,0)FacturacionMecanica,isnull(fm.Puntos,0)PuntosFacturacionMecanica
	,isnull(fc.Ticket,0)FacturacionColision,isnull(fc.Puntos,0)PuntosFacturacionColision
	from vw_ClubIntegralPosventaAS_Ticket t
	left join vw_ClubIntegralPosventaAS_Calculo_Puntos_Satisfaccion s on t.CodigoEmpleado = s.CodigoEmpleado and t.IdCLubIntegralModeloSub = s.IdCLubIntegralModeloSub and t.CodigoMarca = s.CodigoMarca and t.Ano = s.Ano and t.Trimestre = s.Trimestre
	left join vw_ClubIntegralPosventaASM_Calculo_Puntos_Facturacion fm on t.CodigoEmpleado = fm.CodigoEmpleado and t.CodigoMarca = fm.CodigoMarca and t.Ano = fm.Ano_Spiga and t.Trimestre = fm.Trimestre 
	left join vw_ClubIntegralPosventaASC_Calculo_Puntos_Facturacion fc on t.CodigoEmpleado = fc.CodigoEmpleado and t.CodigoMarca = fc.CodigoMarca and t.Ano = fc.Ano_Spiga and t.Trimestre = fc.Trimestre
	where t.IdCLubIntegralModeloSub in ('6','7')
)a


```

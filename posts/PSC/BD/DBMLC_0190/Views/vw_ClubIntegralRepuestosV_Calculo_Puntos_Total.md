# View: vw_ClubIntegralRepuestosV_Calculo_Puntos_Total

## Usa los objetos:
- [[v_ClubIntegral_empleados]]
- [[VehiculosMarcas]]
- [[VehiculosMarcasGrupos]]
- [[vw_Centros]]
- [[vw_ClubIntegralRepuestos_Calculo_Puntos_Cumplimiento]]
- [[vw_ClubIntegralRepuestos_Calculo_Puntos_CumplimientoLinea]]
- [[vw_ClubIntegralRepuestos_Calculo_Puntos_CumplimientoSede]]
- [[vw_ClubIntegralRepuestos_Mes_TicketEntrada]]
- [[vw_ClubIntegralRepuestos_TicketEntrada]]
- [[vw_ClubIntegralRepuestosCartera_CalculoPuntos]]

```sql
CREATE view [dbo].[vw_ClubIntegralRepuestosV_Calculo_Puntos_Total] as
select distinct row_number() over( order by t.CedulaVendedorRepuestos desc)orden,
t.Ano_Spiga,t.CedulaVendedorRepuestos,em.Nombres,t.CodigoCentro,t.NombreCentro,ce.SiglaMarca,v.CodigoMarca,v.Marca,v.CodigoMarcaGrupo,vg.MarcaGrupo,t.Trimestre,t.Resultado
,isnull(cp.Resultado,0)CumplimientoPersonal
,(ca.Rango)RangoCartera
,isnull(cs.ResultadoCumplimientoSede,0)CumplimientoSede
,isnull(cl.Resultado,0)CumplimientoLinea
,isnull(cp.Puntos,0)PuntosCumplimiento
,isnull(ca.puntos,0)PuntosCarteraSede
,isnull(cs.Puntos,0)PuntosCumplimientoSede
,isnull(cl.Puntos,0)PuntosCumplimientoLinea
,(isnull(cp.Puntos,0)+isnull(cs.Puntos,0)+isnull(cl.Puntos,0)+isnull(ca.Puntos,0))PuntosTotal
from vw_ClubIntegralRepuestos_TicketEntrada t
LEFT JOIN vw_ClubIntegralRepuestos_Calculo_Puntos_Cumplimiento cp on t.CedulaVendedorRepuestos = cp.CedulaVendedorRepuestos and t.Ano_Spiga = cp.Ano_Spiga and t.Trimestre = cp.Trimestre
LEFT JOIN vw_ClubIntegralRepuestos_Calculo_Puntos_CumplimientoSede cs on t.CedulaVendedorRepuestos = cs.CedulaVendedorRepuestos and t.Ano_Spiga = cp.Ano_Spiga and t.Trimestre = cs.TrimestreCumplimientoSede
LEFT JOIN vw_Centros ce on t.CodigoCentro = ce.CodigoCentro
LEFT JOIN VehiculosMarcas v on ce.SiglaMarca = v.SiglaMarca
LEFT JOIN VehiculosMarcasGrupos vg on v.CodigoMarcaGrupo = vg.CodigoMarcaGrupo
LEFT JOIN vw_ClubIntegralRepuestos_Calculo_Puntos_CumplimientoLinea cl on v.CodigoMarca = cl.CodigoMarca and t.Ano_Spiga = cl.Ano and t.Trimestre = cl.Trimestre
LEFT JOIN v_ClubIntegral_empleados em  on t.CedulaVendedorRepuestos = em.CodigoEmpleado
LEFT JOIN vw_ClubIntegralRepuestos_Mes_TicketEntrada ti on t.Ano_Spiga = ti.Ano_Spiga and t.CedulaVendedorRepuestos = ti.CedulaVendedorRepuestos
LEFT JOIN vw_ClubIntegralRepuestosCartera_CalculoPuntos ca on t.CodigoCentro = ca.CodigoCentro and t.Trimestre = ca.Trimestre 
where t.Resultado ='PASA' and  em.Nombres is not null

```

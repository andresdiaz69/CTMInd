# View: vw_ClubIntegralRepuestosJR_Comparativa_Ventas

## Usa los objetos:
- [[Empleados]]
- [[v_ClubIntegral_empleados]]
- [[VehiculosMarcas]]
- [[VehiculosMarcasGrupos]]
- [[vw_ClubIntegralRepuestos_Comparativa_Cumplimiento]]

```sql


CREATE VIEW [dbo].[vw_ClubIntegralRepuestosJR_Comparativa_Ventas] as
select v.Ano_Spiga,cie.CodigoEmpleado,cie.nombres,cie.CodigoCentro,cie.NombreCentro,v.cod_marca,ve.Marca,ve.CodigoMarcaGrupo,vg.MarcaGrupo
,(sum(v.JulVendido)+sum(v.AgoVendido)+sum(v.SepVendido))Tri1_Ven
,(sum(v.OctVendido)+sum(v.NovVendido)+sum(v.DicVendido))Tri2_Ven
,(sum(v.EneVendido)+sum(v.FebVendido)+sum(v.MarVendido))Tri3_Ven
,(sum(v.AbrVendido)+sum(v.MayVendido)+sum(v.JunVendido))Tri4_Ven
,(sum(v.JulPresu)+sum(v.AgoPresu)+sum(v.SepPresu))Tri1_Presu
,(sum(v.OctPresu)+sum(v.NovPresu)+sum(v.DicPresu))Tri2_Presu
,(sum(v.EnePresu)+sum(v.FebPresu)+sum(v.MarPresu))Tri3_Presu
,(sum(v.AbrPresu)+sum(v.MayPresu)+sum(v.JunPresu))Tri4_Presu

from vw_ClubIntegralRepuestos_Comparativa_Cumplimiento v
left join empleados e on v.CedulaVendedorRepuestos = e.CodigoEmpleado
left join VehiculosMarcas ve on v.cod_marca = ve.CodigoMarca
left join VehiculosMarcasGrupos vg on ve.CodigoMarcaGrupo = vg.CodigoMarcaGrupo
left join v_ClubIntegral_empleados cie on v.cod_marca = cie.CodigoMarca  and cie.IdCLubIntegralModeloSub ='11'
WHERE v.ano_spiga = 2018 and cie.CodigoEmpleado is not null
group by v.Ano_Spiga,cie.CodigoEmpleado,cie.nombres,cie.CodigoCentro,cie.NombreCentro,v.cod_marca,ve.Marca,ve.CodigoMarcaGrupo,vg.MarcaGrupo


```

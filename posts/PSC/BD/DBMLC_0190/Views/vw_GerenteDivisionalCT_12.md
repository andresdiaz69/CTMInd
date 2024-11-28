# View: vw_GerenteDivisionalCT_12

## Usa los objetos:
- [[ExogenasEmpleadosMarcasPago]]
- [[ExogenasEmpleadosMarcasTipos]]
- [[vw_GerenteDivisionalCT_11]]

```sql






CREATE VIEW [dbo].[vw_GerenteDivisionalCT_12]
AS

select MarcasPago.Ano_Periodo,MarcasPago.Mes_Periodo,MarcasPago.CodigoEmpleado, MarcasPago.CodigoMArca, MarcasPago.Marca, MarcasPago.EntregasEfectivas, SUM(MarcasPago.VentasNacionales) as VentasNacionales,

case when (SUM(MarcasPago.VentasNacionales)) * 1.00 > 0 then
((MarcasPago.EntregasEfectivas * 1.00) / (SUM(MarcasPago.VentasNacionales)) * 1.00) * 100.00 
else 0
end
as PesoComercial  from (

SELECT        dbo.ExogenasEmpleadosMarcasPago.CodigoEmpleado, dbo.vw_GerenteDivisionalCT_11.Ano_Periodo, dbo.vw_GerenteDivisionalCT_11.Mes_Periodo, dbo.vw_GerenteDivisionalCT_11.CodigoEmpresa, dbo.vw_GerenteDivisionalCT_11.CodigoTipo,
                         dbo.vw_GerenteDivisionalCT_11.CodigoMArca, dbo.vw_GerenteDivisionalCT_11.Marca, dbo.vw_GerenteDivisionalCT_11.EntregasEfectivas, dbo.vw_GerenteDivisionalCT_11.VentasNacionales, 
                         dbo.vw_GerenteDivisionalCT_11.PesoComercial
FROM            dbo.vw_GerenteDivisionalCT_11 RIGHT OUTER JOIN
                         dbo.ExogenasEmpleadosMarcasPago ON dbo.vw_GerenteDivisionalCT_11.CodigoMArca = dbo.ExogenasEmpleadosMarcasPago.CodigoMarca
WHERE        (dbo.vw_GerenteDivisionalCT_11.Ano_Periodo IS NOT NULL)) as MarcasPago inner join 
						ExogenasEmpleadosMarcasTipos on MarcasPago.CodigoEmpleado = ExogenasEmpleadosMarcasTipos.CodigoEmpleado and MarcasPago.CodigoTipo = ExogenasEmpleadosMarcasTipos.CodigoTipo 
						and MarcasPago.CodigoMArca = ExogenasEmpleadosMarcasTipos.CodigoMarca
group by MarcasPago.Ano_Periodo,MarcasPago.Mes_Periodo,MarcasPago.CodigoEmpleado, MarcasPago.CodigoMArca, MarcasPago.Marca, MarcasPago.EntregasEfectivas

```

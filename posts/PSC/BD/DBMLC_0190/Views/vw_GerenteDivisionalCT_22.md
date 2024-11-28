# View: vw_GerenteDivisionalCT_22

## Usa los objetos:
- [[ExogenasEmpleadosMarcasPago]]
- [[ExogenasEmpleadosMarcasTipos]]
- [[vw_GerenteDivisionalCT_21]]

```sql




CREATE VIEW [dbo].[vw_GerenteDivisionalCT_22]
AS

select MarcasPago.Ano_Periodo,MarcasPago.Mes_Periodo,MarcasPago.CodigoEmpleado, MarcasPago.CodigoMArca, MarcasPago.Marca, MarcasPago.EntregasEfectivas, SUM(MarcasPago.VentasNacionales) as VentasNacionales,

case when (SUM(MarcasPago.VentasNacionales)) * 1.00 > 0 then
((MarcasPago.EntregasEfectivas * 1.00) / (SUM(MarcasPago.VentasNacionales)) * 1.00) * 100.00 
else 0
end
as PesoComercial  from (

SELECT        dbo.ExogenasEmpleadosMarcasPago.CodigoEmpleado, dbo.vw_GerenteDivisionalCT_21.Ano_Periodo, dbo.vw_GerenteDivisionalCT_21.Mes_Periodo, dbo.vw_GerenteDivisionalCT_21.CodigoEmpresa, dbo.vw_GerenteDivisionalCT_21.CodigoTipo,
                         dbo.vw_GerenteDivisionalCT_21.CodigoMArca, dbo.vw_GerenteDivisionalCT_21.Marca, dbo.vw_GerenteDivisionalCT_21.EntregasEfectivas, dbo.vw_GerenteDivisionalCT_21.VentasNacionales, 
                         dbo.vw_GerenteDivisionalCT_21.PesoComercial
FROM            dbo.vw_GerenteDivisionalCT_21 RIGHT OUTER JOIN
                         dbo.ExogenasEmpleadosMarcasPago ON dbo.vw_GerenteDivisionalCT_21.CodigoMArca = dbo.ExogenasEmpleadosMarcasPago.CodigoMarca
WHERE        (dbo.vw_GerenteDivisionalCT_21.Ano_Periodo IS NOT NULL and CodigoEmpresa = 6)) as MarcasPago inner join 
						ExogenasEmpleadosMarcasTipos on MarcasPago.CodigoEmpleado = ExogenasEmpleadosMarcasTipos.CodigoEmpleado and MarcasPago.CodigoTipo = ExogenasEmpleadosMarcasTipos.CodigoTipo 
						and MarcasPago.CodigoMArca = ExogenasEmpleadosMarcasTipos.CodigoMarca
group by MarcasPago.Ano_Periodo,MarcasPago.Mes_Periodo,MarcasPago.CodigoEmpleado, MarcasPago.CodigoMArca, MarcasPago.Marca, MarcasPago.EntregasEfectivas

```

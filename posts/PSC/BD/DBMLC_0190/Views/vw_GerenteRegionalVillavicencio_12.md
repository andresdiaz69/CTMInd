# View: vw_GerenteRegionalVillavicencio_12

## Usa los objetos:
- [[ExogenasEmpleadosMarcasPago]]
- [[vw_GerenteRegionalVillavicencio_11]]

```sql




CREATE VIEW [dbo].[vw_GerenteRegionalVillavicencio_12]
AS
select MarcasPago.Ano_Periodo,MarcasPago.Mes_Periodo,MarcasPago.CodigoEmpleado, MarcasPago.EntregasEfectivas, MarcasPago.VentasNacionales,

case when (SUM(MarcasPago.VentasNacionales)) * 1.00 > 0 then
((MarcasPago.EntregasEfectivas * 1.00) / (SUM(MarcasPago.VentasNacionales)) * 1.00) * 100.00 
else 0
end
as PesoComercial  from (

SELECT        dbo.ExogenasEmpleadosMarcasPago.CodigoEmpleado, dbo.vw_GerenteRegionalVillavicencio_11.Ano_Periodo, dbo.vw_GerenteRegionalVillavicencio_11.Mes_Periodo, dbo.vw_GerenteRegionalVillavicencio_11.CodigoEmpresa, 
                          SUM(dbo.vw_GerenteRegionalVillavicencio_11.EntregasEfectivas) as EntregasEfectivas , SUM(dbo.vw_GerenteRegionalVillavicencio_11.VentasNacionales) as VentasNacionales, 
                         SUM(dbo.vw_GerenteRegionalVillavicencio_11.PesoComercial)as PesoComercial
FROM            dbo.vw_GerenteRegionalVillavicencio_11 RIGHT OUTER JOIN
                         dbo.ExogenasEmpleadosMarcasPago ON dbo.vw_GerenteRegionalVillavicencio_11.CodigoMArca = dbo.ExogenasEmpleadosMarcasPago.CodigoMarca
WHERE        (dbo.vw_GerenteRegionalVillavicencio_11.Ano_Periodo IS NOT NULL)
group by CodigoEmpleado,Ano_Periodo,Mes_Periodo,CodigoEmpresa ) as MarcasPago

group by CodigoEmpleado,Ano_Periodo,Mes_Periodo,CodigoEmpresa,EntregasEfectivas,VentasNacionales


```

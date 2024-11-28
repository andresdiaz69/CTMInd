# View: v_PrecioVentaEmpleados

## Usa los objetos:
- [[VehiculosDisponibles]]

```sql




CREATE view [dbo].[v_PrecioVentaEmpleados] as
select distinct Empresa,Marca,Gama,Modelo,AñoModelo,Descripcion,PrecioVentaPublico,
PrecioVentaEmpleados=case when VentaEmpleado > CostoEmpleado then VentaEmpleado else CostoEmpleado end
from(
       Select Empresa,Marca,Gama,Modelo,AñoModelo,Descripcion,PrecioVentaPublico=convert(money,PrecioVentaPublico),
       VentaEmpleado=convert(money,VentaEmpleado),
       CostoEmpleado=convert(money,Costo+(Costo*5)/100)
       from(
             select Empresa,Marca,Gama,Modelo=FkCodModelo,AñoModelo=FkAñoModelo,Descripcion=Modelo,
             PrecioVentaPublico=ImporteTotal_MonedaOrigen,
             VentaEmpleado=ImporteTotal_MonedaOrigen-(ImporteTotal_MonedaOrigen*7)/100,
             Costo= BaseImponible+GastosAdicionalesIncrementaStock-BonoFabricaReclamado
             from [192.168.90.10\SPIGAPLUS].[DMS00280].dbo.VehiculosDisponibles
             where PkFkCentros in (1,4,7,53,84,130,91)
       ) a
)b
--order by PrecioVentaEmpleados


```

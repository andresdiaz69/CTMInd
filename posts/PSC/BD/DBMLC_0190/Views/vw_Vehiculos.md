# View: vw_Vehiculos

## Usa los objetos:
- [[AspNetUsers]]
- [[VehiculosGamas]]
- [[VehiculosMarcas]]
- [[VehiculosModelos]]

```sql

CREATE VIEW [dbo].[vw_Vehiculos]
AS
SELECT        dbo.VehiculosMarcas.CodigoMarca, dbo.VehiculosMarcas.Marca, dbo.VehiculosGamas.CodigoGama, dbo.VehiculosGamas.Gama, dbo.VehiculosModelos.CodigoModelo, dbo.VehiculosModelos.AnoModelo, 
                         dbo.VehiculosModelos.ValorComision, dbo.VehiculosModelos.PrecioListaAntesDeImpuestos, dbo.VehiculosModelos.PorcComisionPrecioListaAntesDeImp, dbo.VehiculosModelos.PrecioListaFull, dbo.VehiculosModelos.Costo,
                         dbo.VehiculosModelos.ModeloActivo, dbo.VehiculosModelos.VehiculoUtilitario, dbo.VehiculosMarcas.Marca + N' - ' + dbo.VehiculosGamas.Gama + N' - ' + dbo.VehiculosModelos.CodigoModelo + N' - ' + CAST(dbo.VehiculosModelos.AnoModelo AS varchar(4)) 
                         AS ModeloCompleto, dbo.VehiculosModelos.UserIdModifico, dbo.AspNetUsers.Email, dbo.VehiculosModelos.FechaModificacion
FROM            dbo.VehiculosGamas INNER JOIN
                         dbo.VehiculosMarcas ON dbo.VehiculosGamas.CodigoMarca = dbo.VehiculosMarcas.CodigoMarca INNER JOIN
                         dbo.VehiculosModelos ON dbo.VehiculosGamas.CodigoGama = dbo.VehiculosModelos.CodigoGama AND dbo.VehiculosGamas.CodigoMarca = dbo.VehiculosModelos.CodigoMarca INNER JOIN
                         dbo.AspNetUsers ON dbo.VehiculosModelos.UserIdModifico = dbo.AspNetUsers.Id

```

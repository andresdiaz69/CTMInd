# View: vw_Spiga_SatisfaccionDeClientes

## Usa los objetos:
- [[spiga_SatisfaccionDeClientes]]

```sql
CREATE VIEW [dbo].[vw_Spiga_SatisfaccionDeClientes] AS

		SELECT DISTINCT IdConsecutivo, IdEmpresas, FkTerceros, Tercero, NifCif, Direccion, TelefonoPrincipal, TelefonoTrabajo, Celular, Email, Ciudad, IdTercerosContacto, TerceroContacto,
		NifCifContacto, DireccionContacto, TelefonoPrincipalContacto, TelefonoTrabajoContacto, CelularContacto, EmailContacto, CiudadContacto, Asesor,
		OrdenServicio, Matricula, VIN, Marca, Gama, DescripcionModelo, Kmts, FechaCompra, Descripcion, NombreCentro, IdCentros, PkAñoSalidasAlbaran,
		PedidoTipoVentas,FechaEntregaVenta = case when Descripcion in ('Venta VN','Venta VO') then FechaEntregaVenta else convert(date,FechaCompra,123) end
		FROM [PSCService_DB].dbo.spiga_SatisfaccionDeClientes 
		--where descripcion not IN ('Venta VN','Venta VO')
		--revihaving year(case when Descripcion in ('Venta VN','Venta VO') then FechaEntregaVenta else FechaCompra end)=2021

```

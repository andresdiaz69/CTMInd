# Stored Procedure: sp_AddOC_LinalcaDatecsa

## Usa los objetos:
- [[PedidosComprasDiversasDet]]

```sql



CREATE proc [dbo].[sp_AddOC_LinalcaDatecsa]
@Empresa int, 
@Nro_Oc_Ant int,
@Nro_OC_Act int,
@Nro_Se_Ant char(3),
@Ano char(4)
as
begin
set nocount on
set fmtonly off

insert into	[192.168.80.14].[DMS00280].[CM].[PedidosComprasDiversasDet]
			([PkFkEmpresas], [PkFkAñoPedido], [PkFkSeries],[PkFkPedidosComprasDiversas], [PkPedidosComprasDiversasDet_Iden],
			[FkArticulos], [Unidades],[PrecioUnitario], [DtoPorc], [FechaAlta], [FechaBaja], [Observaciones], [FkImpuestos],
			[PorcImpuestos], [NumeroContrato], [NumeroUnidadesEnvase],[FechaEstimadaEntrega], [FkCentros_Entrega], 
			[NombreEmpleadoEntrega], [FkContCtas], [UserMod], [HostMod], [VersionFila],[FechaMod], [NumeroDetalleExterno], 
			[Descripcion], [ImporteExento], [FkUnidadesMedida], [UnidadesRecibidas], [FkArticulosTipos],[PrecioFijado], 
			[FkImpuestos_Secundario], [PorcImpuestoSecundario], [ImporteNoSujeto])

select  PkFkEmpresas, PkFkAñoPedido, PkFkSeries, @Nro_OC_Act AS PkFkPedidosComprasDiversas, PkPedidosComprasDiversasDet_Iden, 
        FkArticulos, Unidades, PrecioUnitario, DtoPorc, GETDATE() AS FechaAlta, FechaBaja, Observaciones, FkImpuestos, 
        PorcImpuestos, NumeroContrato, NumeroUnidadesEnvase, FechaEstimadaEntrega, FkCentros_Entrega, 
        NombreEmpleadoEntrega, FkContCtas, UserMod,HostMod, VersionFila, GETDATE() AS FechaMod, NumeroDetalleExterno,
        Descripcion, ImporteExento, FkUnidadesMedida, NULL AS UnidadesRecibidas, FkArticulosTipos, PrecioFijado, 
        FkImpuestos_Secundario, PorcImpuestoSecundario, ImporteNoSujeto
from	[192.168.80.14].[DMS00280].[CM].[PedidosComprasDiversasDet]
where	(PkFkEmpresas = @Empresa) AND (PkFkAñoPedido = @Ano) AND (PkFkPedidosComprasDiversas = @Nro_Oc_Ant) AND 
		(PkFkSeries = @Nro_Se_Ant) AND
		(PkPedidosComprasDiversasDet_Iden > 1)

end

```

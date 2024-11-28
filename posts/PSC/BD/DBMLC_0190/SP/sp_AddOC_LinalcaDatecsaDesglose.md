# Stored Procedure: sp_AddOC_LinalcaDatecsaDesglose

## Usa los objetos:
- [[PedidosComprasDiversasDetDesgloses]]

```sql



CREATE proc [dbo].[sp_AddOC_LinalcaDatecsaDesglose]
@Empresa int,
@Nro_Oc_Ant int,
@Nro_OC_Act int,
@Nro_Se_Ant char(3),
@Ano char(4)
as
begin
set nocount on
set fmtonly off

insert into	[192.168.80.14].[DMS00280].[CM].[PedidosComprasDiversasDetDesgloses]
			([PkFkEmpresas],[PkFkAñoPedido],[PkFkSeries],[PkFkPedidosComprasDiversas],[PkFkPedidosComprasDiversasDet],
            [PkPedidosComprasDiversasDetDesgloses_Iden],[Porcentaje],[Unidades],[Importe],[FkCentros],[FkDepartamentos],
            [FkSecciones],[UserMod],[HostMod],[VersionFila],[FechaMod],[FkMarcas],[FkEntidades],[UnidadesRecibidas])

select	PkFkEmpresas, PkFkAñoPedido, PkFkSeries, @Nro_OC_Act AS PkFkPedidosComprasDiversas, PkFkPedidosComprasDiversasDet, 
		PkPedidosComprasDiversasDetDesgloses_Iden, Porcentaje, Unidades, Importe,FkCentros, FkDepartamentos, 
		FkSecciones, UserMod, HostMod, VersionFila, GETDATE() AS FechaMod, FkMarcas, FkEntidades, NULL AS UnidadesRecibidas 
from	[192.168.80.14].[DMS00280].[CM].[PedidosComprasDiversasDetDesgloses]
where	PkFkEmpresas = @Empresa
		and PkFkAñoPedido = @Ano
		and	PkFkPedidosComprasDiversas = @Nro_Oc_Ant
		and	PkFkSeries = @Nro_Se_Ant

end

```

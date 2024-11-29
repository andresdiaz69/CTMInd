## Parámetros

```sql
@idEmpresas int, 
@IdCentros smallint=null, 
@FechaFacturaTrabajoDesde datetime=null,
@FechaFacturaTrabajohasta datetime=null 
```
## Usa los objetos:

- [[Facturacion]]
- [[Trabajos]]
- [[TrabajoOrdenes]]
- [[FacturaGarantias]]]
- [[SalidasDet]]
- [[Referencias]]
- [[APP/posts/PSC/BD/DMS90280/Tables/Empresas|Empresas]]
- [[APP/posts/PSC/BD/DMS90280/Tables/Centros|Centros]]
- [[APP/posts/PSC/BD/DMS90280/Tables/Secciones|Secciones]]
- [[Vehiculos]]
- [[Terceros]]
- [[EmpresaCentroTerceros]]
- [[ClienteCategorias]]
- [[SeccionCargos]]
- [[APP/posts/PSC/BD/DMS90280/Tables/Empleados|Empleados]]
- [[SalidasDetImpuestos]]
- [[ReferenciasTarifas]]
- [[Clasificacion1]]
- [[Clasificacion2]]
- [[Clasificacion3]]
- [[Clasificacion4]]
- [[Clasificacion5]]
- [[Clasificacion6]]
- [[Salidas]]
- [[Marcas]]
- [[Gamas]]
- [[ImputacionTipos]]
- [[TrabajoManoObras]]
- [[TrabajoManoObrasEmpleados]]
- [[TrabajoManoObrasImpuestos]]
- [[ManoObraCodigos]]
- [[TrabajoVarios]]
- [[TrabajosVariosImpuestos]]
- [[TrabajoPinturas]]
- [[TrabajoPinturaImpuestos]]
- [[EntradasTrabajosExternosDet]]
- 

```sql
USE [DMS00280]
GO
    /****** Object:  StoredProcedure [OPC].[Comisiones_Taller_PorOT]    Script Date: 29/11/2024 9:12:26 a. m. ******/
SET
    ANSI_NULLS ON
GO
SET
    QUOTED_IDENTIFIER ON
GO
    ALTER procedure [OPC].[Comisiones_Taller_PorOT] (
        @idEmpresas int,
        @IdCentros smallint = null,
        @FechaFacturaTrabajoDesde datetime = null,
        @FechaFacturaTrabajohasta datetime = null
    ) as --declare @idEmpresas int=6
    --declare @IdCentros smallint=null
    --declare @FechaFacturaTrabajoDesde datetime='01/02/2017'
    --declare @FechaFacturaTrabajohasta datetime='28/02/2017'
    --declare @fd as bit
    declare @ft as bit --set @fd=(case when @FechaDocumentoDesde is null and @FechaDocumentohasta is null then 0 else 1 end)
    --set @FechaDocumentoDesde=isnull(@FechaDocumentoDesde,convert(datetime,'1900-01-01T00:00:00.000',126))
    --set @FechaDocumentohasta=isnull(@FechaDocumentohasta,convert(datetime,'9999-12-31T00:00:00.000',126))
select
    @ft =(
        case
            when @FechaFacturaTrabajoDesde is null
            and @FechaFacturaTrabajohasta is null then 0
            else 1
        end
    ),
    @FechaFacturaTrabajoDesde = isnull(
        @FechaFacturaTrabajoDesde,
        convert(datetime, '1900-01-01T00:00:00.000', 126)
    ),
    @FechaFacturaTrabajohasta = isnull(
        @FechaFacturaTrabajohasta,
        convert(datetime, '9999-12-30T00:00:00.000', 126)
    ),
    @FechaFacturaTrabajohasta = dateadd("d", 1, @FechaFacturaTrabajoHasta);

--si esta cubierta la fecha de facturacion le damos prioridad a dicha fecha
--if @ft=1 
--begin
--	set @fd=0
--end
CREATE TABLE #fact(
[PkFkEmpresas] [smallint] NOT NULL,
[PkFkCentros] [smallint] NOT NULL,
[PkAñoFactura] [nvarchar](4) collate database_default NOT NULL,
[PkFkSeries] [nvarchar](6) collate database_default NOT NULL,
[PkNumFactura] [nvarchar](30) collate database_default NOT NULL,
[FkAñoAsiento] [nvarchar](4) NULL,
[FkAsientos] [int] NULL,
[FkTerceros] [int] NULL,
[FechaFactura] [datetime] NULL,
[FkPagoFormas] [nvarchar](5) collate database_default NULL,
[NifCif] [nvarchar](50) NULL,
[ImporteMO] [decimal](18, 4) NULL,
[ImporteMAT] [decimal](18, 4) NULL,
[ImporteSUB] [decimal](18, 4) NULL,
[ImporteVarios] [decimal](18, 4) NULL,
[ImportePint] [decimal](18, 4) NULL,
[PkFkAñoOT] [nvarchar](4) collate database_default not NULL,
[PkFkSeries_OT] [nvarchar](6) collate database_default not NULL,
[PkFkNumOT] [int] not NULL,
[PkFkNumTrabajo] [tinyint] not NULL,
PFCentroOT smallint not null,
FkSecciones int,
Descripcion nvarchar(200),
FechaAlta datetime,
FkSeccionCargos nvarchar(5) collate database_default,
FkCargoTipos nvarchar(4) collate database_default,
trabajorepetido bit,
FkNumPresupuesto int,
FkEmpleados_Alta smallint,
FkEmpleados_Cierre smallint,
FkImputacionTipos smallint,
fechaentrega datetime,
fkvehiculos int,
FkEmpleados_Responsable smallint,
FkEmpleados_retirada smallint,
FkMarcaTallerModelos nvarchar(20) collate database_default primary key (
    [PkFkEmpresas],
    PFCentroOT,
    [PkFkAñoOT],
    [PkFkSeries_OT],
    [PkFkNumOT],
    [PkFkNumTrabajo],
    [PkAñoFactura],
    [PkFkSeries],
    [PkNumFactura]
)
)
insert into
    #fact
SELECT
    t100.PkFkEmpresas,
    t100.PkFkCentros,
    t100.PkAñoFactura,
    t100.PkFkSeries,
    t100.PkNumFactura,
    t100.FkAñoAsiento,
    t100.FkAsientos,
    t100.FkTerceros,
    t100.FechaFactura,
    t100.FkPagoFormas,
    t100.NifCif,
    t100.ImporteMO,
    t100.ImporteMAT,
    t100.ImporteSUB,
    t100.ImporteVarios,
    t100.ImportePint,
    t101.PkFkAñoOT,
    t101.PkFkSeries_OT,
    t101.PkFkNumOT,
    t101.PkFkNumTrabajo,
    t2.PkFkCentros as PFCentroOT,
    t2.FkSecciones,
    t2.Descripcion,
    t2.fechaAlta,
    t2.FkSeccionCargos,
    t2.FkCargoTipos,
    t2.trabajorepetido,
    t2.FkNumPresupuesto,
    t2.FkEmpleados_Alta,
    t2.FkEmpleados_Cierre,
    t2.FkImputacionTipos,
    t3.fechaentrega,
    t3.fkvehiculos,
    t3.FkEmpleados_Responsable,
    t3.FkEmpleados_retirada,
    t3.FkMarcaTallerModelos
FROM
    TA.Facturacion as t100
    INNER JOIN TA.FacturacionDet as t101 ON t100.PkFkEmpresas = t101.PkFkEmpresas
    AND t100.PkFkCentros = t101.PkFkCentros
    AND t100.PkAñoFactura = t101.PkFkAñoFactura
    AND t100.PkFkSeries = t101.PkFkSeries
    AND t100.PkNumFactura = t101.PkFkNumFactura
    inner join ta.trabajos as t2 on t2.PkFkEmpresas = t101.PkFkEmpresas
    and t2.PkFkAñoOT = t101.PkFkAñoOT
    and t2.PkFkSeries = t101.PkFkSeries_OT
    and t2.PkFkNumOT = t101.PkFkNumOT
    and t2.PkNumTrabajo_Iden = t101.PkFkNumTrabajo inner loop
    join ta.trabajoordenes as t3 with (nolock) on t2.pkfkempresas = t3.pkfkempresas
    and t2.PkFkCentros = t3.pkfkcentros
    and t2.pkfkañoot = t3.pkañoot
    and t2.pkfkseries = t3.pkfkseries
    and t2.pkfknumot = t3.pknumot
where
    t100.PkFkEmpresas = @idEmpresas
    and t100.pkFkCentros = isnull(@IdCentros, t100.pkFkCentros)
    and t100.FechaFactura >= @FechaFacturaTrabajoDesde
    and t100.FechaFactura <= @FechaFacturaTrabajoHasta
    and t100.FkAsientos is not null
union
all
SELECT
    t102.PkFkEmpresas,
    t102.FkCentros AS pkfkcentros,
    t102.PkFkAñoFactura AS PkAñoFactura,
    t102.PkFkSeries_Factura AS pkfkseries,
    t102.PkFkNumFactura AS pknumfactura,
    t102.PkFkAñoFactura AS AñoAsiento,
    t102.FkAsientos,
    t102.FkTerceros,
    t102.FechaFactura,
    t102.FkPagoFormas,
    t102.NifCif,
    t102.TotalMO,
    t102.TotalMat,
    t102.TotalSub,
    t102.TotalVarios,
    t102.TotalPint,
    t103.FkAñoOT as PkFkAñoOT,
    t103.FkSeries_OT as PkFkSeries_OT,
    t103.FkNumOT as PkFkNumOT,
    t103.FkNumTrabajo as PkFkNumTrabajo,
    t2.PkFkCentros as PFCentroOT,
    t2.FkSecciones,
    t2.Descripcion,
    t2.fechaAlta,
    t2.FkSeccionCargos,
    t2.FkCargoTipos,
    t2.trabajorepetido,
    t2.FkNumPresupuesto,
    t2.FkEmpleados_Alta,
    t2.FkEmpleados_Cierre,
    t2.FkImputacionTipos,
    t3.fechaentrega,
    t3.fkvehiculos,
    t3.FkEmpleados_Responsable,
    t3.FkEmpleados_retirada,
    t3.FkMarcaTallerModelos
FROM
    TA.FacturaGarantias as t102
    INNER JOIN TA.FacturaGarantiasDet as t103 ON t102.PkFkEmpresas = t103.PkFkEmpresas
    AND t102.PkFkAñoFactura = t103.PkFkAñoFactura
    AND t102.PkFkSeries_Factura = t103.PkFkSeries_Factura
    AND t102.PkFkNumFactura = t103.PkFkNumFactura
    inner join ta.trabajos as t2 on t2.PkFkEmpresas = t103.PkFkEmpresas
    and t2.PkFkAñoOT = t103.FkAñoOT
    and t2.PkFkSeries = t103.FkSeries_OT
    and t2.PkFkNumOT = t103.FkNumOT
    and t2.PkNumTrabajo_Iden = t103.FkNumTrabajo inner loop
    join ta.trabajoordenes as t3 with (nolock) on t2.pkfkempresas = t3.pkfkempresas
    and t2.PkFkCentros = t3.pkfkcentros
    and t2.pkfkañoot = t3.pkañoot
    and t2.pkfkseries = t3.pkfkseries
    and t2.pkfknumot = t3.pknumot
where
    t102.PkFkEmpresas = @idEmpresas
    and t102.FkCentros = isnull(@IdCentros, t102.FkCentros)
    and t102.FechaFactura >= @FechaFacturaTrabajoDesde
    and t102.FechaFactura <= @FechaFacturaTrabajoHasta
SELECT
    year(t1.fechafactura) as Año,
    month(t1.fechafactura) as Mes,
    t1.pkfkempresas as CodigoEmpresa,
    t6.Nombre as Empresa,
    t1.pkfkcentros as CodigoCentro,
    t7.nombre as Centro,
    t1.fksecciones as CodigoSeccion,
    t8.descripcion as Seccion,
    t1.PkFkAñoOT + '\\'+ t1.PkFkSeries_OT + ' \\ ' + cast(t1.PkFkNumOT as nvarchar(20)) + ' \\ ' + cast(t1.PkFkNumTrabajo as nvarchar(20)) as NumOT,
		t1.PkAñoFactura +' \\ '+t1.PkFkSeries + ' \\ '+ t1.PkNumFactura as NumeroFacturaTaller,
		t31.PkAñoSalidasAlbaran +' \\ '+ t31.PkFkSeries_Salidas +' \\ '+ t31.PkNumSalidasAlbaran as NumeroAlbaran,
		t1.fechaAlta as FechaAperturaOrden,
		t1.FechaFactura,
		t1.fechaentrega,
		t9.matricula as Placa,
		t9.VIN,
		t9.FkServicioTipos,
		t9.fkmarcas as Marcaveh,
		t36.nombre as NombreMarca,
		t9.fkgamas as Gama,
		t37.nombre as NombreGama,
		t1.NifCif as NitCliente,

		replace(replace(replace(replace(replace(replace(t10.Nombre,char(13)+char(10)+' - ',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),'') 
		+ ' ' 
		+ replace(replace(replace(replace(replace(replace(isnull(t10.Apellido1,''),char(13)+char(10)+' - ',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),'')  
		+ ' '
		+ replace(replace(replace(replace(replace(replace(isnull(isnull(t10.Apellido2,''),''),char(13)+char(10)+' - ',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),'') 

		as NombreCliente,


		t11.FkClienteCategorias as CodigoCategoriaCliente,
		t12.descripcion as CategoriaCliente,
		t1.FkSeccionCargos as TipoCargo,
		t1.FkCargoTipos as TipoIntCargo,

		replace(replace(replace(replace(replace(replace(t4.fkMR,char(13)+char(10)+' - ',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),'') as marca,
		replace(replace(replace(replace(replace(replace(t4.fkreferencias,char(13)+char(10)+' - ',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),'') as Codigo,
		replace(replace(replace(replace(replace(replace(t5.descripcion ,char(13)+char(10)+' - ',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),'') as descripcion,

		' MAT ' as TipoOperacion,
		t4.precio as ValorUnitario,
		t4.Unidades as UnidadesVendidas,
		t4.dtoporc *100.00 as PorcentajeDescuento,
		t54.ImporteImpuesto,
		t15.NifCif as CedulaOperario,
		t15.Nombre + ' ' + isnull(t15.Apellido1,'') + ' '+ isnull(t15.Apellido2,'') as NombreOperario,
		t15.NifCif as CedulaAsesorServicioAlta,
		t15.Nombre + ' ' + isnull(t15.Apellido1,'') + ' '+ isnull(t15.Apellido2,'') as AsesorServicioAlta,
		t19.NifCif as CedulaAsesorServicioResponsable,
		t19.Nombre + ' ' + isnull(t19.Apellido1,'') + ' '+ isnull(t19.Apellido2,'') as AsesorServicioResponsable,
		t21.NifCif as CedulaAsesorServicioCierre,
		t21.Nombre + ' ' + isnull(t21.Apellido1,'') + ' '+ isnull(t21.Apellido2,'') as AsesorServicioCierre,
		t23.NifCif as CedulaAsesorServicioRetirada,
		t23.Nombre + ' ' + isnull(t23.Apellido1,'') + ' '+ isnull(t23.Apellido2,'') as AsesorServicioRetirada,
		t1.trabajorepetido as TrabajoRetorno,
		(case when t1.FkNumPresupuesto is not null then 1 else 0 end) as Cotizacion,
		null as CampañaRepuesto,
		t25.PkClasificacion1 as CodClas1,t25.Descripcion as DescripClas1,
		t26.PkClasificacion2 as CodClas2, t26.Descripcion as DescripClas2,
		t27.PkClasificacion3 as CodClas3, t27.Descripcion as DescripClas3,
		t28.PkClasificacion4 as CodClas4, t28.Descripcion as DescripClas4,
		t29.PkClasificacion5 as CodClas5, t29.Descripcion as DescripClas5,
		t30.PkClasificacion6 as CodClas6, t30.Descripcion as DescripClas6,
		t33.nifcif as CedulaVendedorRepuestos,
		t33.Nombre + ' ' + isnull(t33.Apellido1,'') + ' '+ isnull(t33.Apellido2,'') as NombreVendedorRepuestos,
		t35.nifcif as CedulaBodeguero,
		t35.Nombre + ' ' + isnull(t35.Apellido1,'') + ' '+ isnull(t35.Apellido2,'') as NombreBodeguero,
		isnull((select sum(t16.PrecioMedioActual*t16.Unidades)
					 from RE.SalidasDet as t16 
					 where t1.PkFkEmpresas=t16.PkFkEmpresas and t1.PkFkAñoOT=t16.FkAñoOT and t1.PkFkSeries_OT=t16.FkSeries_OT and t1.PkFkNumOT=t16.FkNumOT and t1.PkFkNumTrabajo=t16.FkNumTrabajo),0.0) as Coste,
		t38.PkImputacionTipos_Iden as IdImputaciontipos, t38.Descripcion as TipoImputacion, 
		t1.Descripcion as DescripcionTrabajo, NULL as FkMarcaTallerModelos,NULL as FkTarifaTaller
FROM #fact as t1		   inner join re.salidasdet as t4  on t1.PkFkEmpresas=t4.PkFkEmpresas and t1.PkFkAñoOT=t4.FkAñoOT and t1.PkFkSeries_OT=t4.FkSeries_OT and t1.PkFkNumOT=t4.FkNumOT and t1.PkFkNumTrabajo=t4.FkNumTrabajo
						   inner join re.referencias as t5  on t4.fkmr=t5.pkfkmr and t4.fkreferencias=t5.pkreferencias
						   inner join cm.empresas as t6  on t1.pkfkempresas=t6.pkempresas
						   inner join cm.centros as t7  on t1.pkfkcentros=t7.pkcentros
						   INNER JOIN CM.Secciones AS t8  ON t1.FkSecciones = t8.PkSecciones_Iden
						   inner join cm.vehiculos as t9  on t1.fkvehiculos=t9.pkvehiculos_iden
						   LEFT OUTER JOIN CM.Terceros as t10   ON t1.FkTerceros = t10.PkTerceros
						   left outer JOIN CM.EmpresaCentroTerceros AS t11  ON t1.PkFkEmpresas = t11.PkFkEmpresas AND t1.pkFkCentros = t11.PkFkCentros AND t1.FkTerceros = t11.pkFkTerceros
						   left outer join CM.ClienteCategorias as t12  on t11.FkClienteCategorias=t12.PkClienteCategorias_Iden
						   left outer join ta.seccioncargos as t13  on  t1.PkFkEmpresas = t13.PkFkEmpresas AND t1.PFCentroOT = t13.PkFkCentros AND  t1.FkSecciones = t13.PkFkSecciones AND t1.FkSeccionCargos = t13.PkSeccionCargos
 
						   left outer join rh.empleados as t14  on t1.FkEmpleados_Alta=t14.pkEmpleados_Iden
						   left outer join cm.terceros as t15  on t14.fkterceros=t15.pkterceros
						   --left outer join rh.empleados as t16  on t1.FkEmpleados_Alta=t16.pkEmpleados_Iden
						   --left outer join cm.terceros as t17  on t16.fkterceros=t17.pkterceros
						   left outer join rh.empleados as t18  on t1.FkEmpleados_Responsable=t18.pkEmpleados_Iden
						   left outer join cm.terceros as t19  on t18.fkterceros=t19.pkterceros
						   left outer join rh.empleados as t20  on t1.FkEmpleados_Cierre=t20.pkEmpleados_Iden
						   left outer join cm.terceros as t21  on t20.fkterceros=t21.pkterceros
						   left outer join rh.empleados as t22  on t1.FkEmpleados_retirada=t22.pkEmpleados_Iden
						   left outer join cm.terceros as t23  on t22.fkterceros=t23.pkterceros

                            outer apply (SELECT SUM(t44.Unidades * (t44.Precio - t44.Precio * t44.DtoPorc) * t554.PorcImpuesto) AS ImporteImpuesto
										 FROM re.salidasdet as t44 inner join RE.SalidasDetImpuestos as t554  on t44.PkFkEmpresas = t554.PkFkEmpresas AND t44.PkFkCentros = t554.PkFkCentros AND t44.PkFkAñoSalidasAlbaran = t554.PkFkAñoSalidasAlbaran AND t44.PkFkSeries_Salidas = t554.PkFkSeries_Salidas AND t44.PkFkNumSalidasAlbaran = t554.PkFkNumSalidasAlbaran AND t44.PkSalidasDet = t554.PkFkSalidasDet
										 where t4.pkfkempresas=t44.pkfkempresas and t4.PkFkCentros=t44.PkFkCentros and t4.PkFkAñoSalidasAlbaran=t44.PkFkAñoSalidasAlbaran and t4.PkFkSeries_Salidas=t44.PkFkSeries_Salidas and 
												t4.PkFkNumSalidasAlbaran=t44.PkFkNumSalidasAlbaran and t4.PkSalidasDet=t44.PkSalidasDet
										) as t54

						   left outer join RE.ReferenciasTarifas  as t24  on  t4.FkMR=t24.PkFkMR AND  t4.FkReferencias=t24.PkFkReferencias AND  t4.FkTarifas=t24.PkFkTarifas 
						   left outer join RE.Clasificacion1 as t25  ON t24.PkFkMR = t25.PkFkMR AND t24.PkFkTarifas = t25.PkFkTarifas AND t24.FkClasificacion1 = t25.PkClasificacion1
						   left outer join RE.Clasificacion2  as t26  ON t24.PkFkMR = t26.PkFkMR AND t24.PkFkTarifas = t26.PkFkTarifas AND t24.FkClasificacion2 = t26.PkClasificacion2 
						   left outer join RE.Clasificacion3 as t27  ON t24.PkFkMR = t27.PkFkMR AND t24.PkFkTarifas = t27.PkFkTarifas AND t24.FkClasificacion3 = t27.PkClasificacion3
						   left outer join RE.Clasificacion4 as t28  ON t24.PkFkMR = t28.PkFkMR AND t24.PkFkTarifas = t28.PkFkTarifas AND t24.FkClasificacion4 = t28.PkClasificacion4
						   left outer join RE.Clasificacion5 as t29  ON t24.PkFkMR = t29.PkFkMR AND t24.PkFkTarifas = t29.PkFkTarifas AND t24.FkClasificacion5 = t29.PkClasificacion5
						   left outer join RE.Clasificacion6 as t30  ON  t24.PkFkMR=t30.PkFkMR AND  t24.PkFkTarifas=t30.PkFkTarifas  AND  t24.FkClasificacion6= t30.PkClasificacion6
						   inner join re.salidas as t31  on t4.PkFkEmpresas=t31.PkFkEmpresas and t4.PkFkCentros=t31.PkFkCentros and t4.PkFkAñoSalidasAlbaran=t31.PkAñoSalidasAlbaran and t4.PkFkSeries_Salidas=t31.PkFkSeries_Salidas and t4.PkFkNumSalidasAlbaran=t31.PkNumSalidasAlbaran
						   LEFT OUTER JOIN RH.Empleados as t32   ON t31.FkEmpleados_VendedorRecambios = t32.PkEmpleados_Iden 
						   LEFT OUTER JOIN CM.Terceros as t33   ON t32.FkTerceros = t33.PkTerceros
						   LEFT OUTER JOIN RH.Empleados as t34   ON t31.FkEmpleados_Usuario = t34.PkEmpleados_Iden 
						   LEFT OUTER JOIN CM.Terceros as t35   ON t34.FkTerceros = t35.PkTerceros
						   left outer join cm.marcas as t36  on t9.fkmarcas=t36.pkmarcas 
						   left outer join cm.gamas as t37  on t9.fkmarcas=t37.pkfkmarcas and  t9.fkgamas=t37.pkgamas
						   left outer join CM.ImputacionTipos as t38  on t38.PkFkEmpresas=t1.PkFkEmpresas and t38.PkImputacionTipos_Iden=t1.FkImputacionTipos

union all
--**********************
--Ahora va la MO
--**********************
SELECT year(t1.fechafactura) as Año,
		month(t1.fechafactura) as Mes,
		t1.pkfkempresas as CodigoEmpresa,
		t6.Nombre as Empresa,
		t1.pkfkcentros as CodigoCentro,
		t7.nombre as Centro,
		t1.fksecciones as CodigoSeccion,
		t8.descripcion as Seccion, 
		t1.PkFkAñoOT +' \\ '+ t1.PkFkSeries_OT + ' \\ ' + cast(t1.PkFkNumOT as nvarchar(20)) + ' \\ ' + cast(t1.PkFkNumTrabajo as nvarchar(20)) as NumOT,
		t1.PkAñoFactura +' \\ '+t1.PkFkSeries + ' \\ '+ t1.PkNumFactura as NumeroFacturaTaller,
		Null as NumeroAlbaran,
		t1.fechaAlta as FechaAperturaOrden,
		t1.FechaFactura,
		t1.fechaentrega,
		t9.matricula as Placa,
		t9.VIN,
		t9.FkServicioTipos,
		t9.fkmarcas as Marcaveh,
		t36.nombre as NombreMarca,
		t9.fkgamas as Gama,
		t37.nombre as NombreGama,
		t1.NifCif as NitCliente,
		replace(replace(replace(replace(replace(replace(t10.Nombre,char(13)+char(10)+' - ',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),'') 
		+ ' ' 
		+ replace(replace(replace(replace(replace(replace(isnull(t10.Apellido1,''),char(13)+char(10)+' - ',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),'')  
		+ ' '
		+ replace(replace(replace(replace(replace(replace(isnull(isnull(t10.Apellido2,''),''),char(13)+char(10)+' - ',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),'') 

		as NombreCliente,
		t11.FkClienteCategorias as CodigoCategoriaCliente,
		t12.descripcion as CategoriaCliente,
		t1.FkSeccionCargos as TipoCargo,
		t1.FkCargoTipos as TipoIntCargo,
		NUll as Marca,
		t4.fkmanoobracodigos as Codigo,
		replace(replace(replace(replace(replace(replace(t4.descripcion ,char(13)+char(10)+' - ',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),'') as descripcion,
		' MO ' as TipoOperacion,
		t4.preciohora as ValorUnitario,
		t4.UT/100.00 * t5.PorcUT as UnidadesVendidas,
		t4.porcdescuento *100.00 as PorcentajeDescuento,
		t54.ImporteImpuesto,

		t15.NifCif as CedulaOperario,
		t15.Nombre + ' ' + isnull(t15.Apellido1,'') + ' '+ isnull(t15.Apellido2,'') as NombreOperario,
		t17.NifCif as CedulaAsesorServicioAlta,
		t17.Nombre + ' ' + isnull(t17.Apellido1,'') + ' '+ isnull(t17.Apellido2,'') as AsesorServicioAlta,
		t19.NifCif as CedulaAsesorServicioResponsable,
		t19.Nombre + ' ' + isnull(t19.Apellido1,'') + ' '+ isnull(t19.Apellido2,'') as AsesorServicioResponsable,
		t21.NifCif as CedulaAsesorServicioCierre,
		t21.Nombre + ' ' + isnull(t21.Apellido1,'') + ' '+ isnull(t21.Apellido2,'') as AsesorServicioCierre,
		t23.NifCif as CedulaAsesorServicioRetirada,
		t23.Nombre + ' ' + isnull(t23.Apellido1,'') + ' '+ isnull(t23.Apellido2,'') as AsesorServicioRetirada,
		t1.trabajorepetido as TrabajoRetorno,
		(case when t1.FkNumPresupuesto is not null then 1 else 0 end) as Cotizacion,
		null as CampañaRepuesto,
		NULL as  CodClas1,NULL as DescripClas1,
		NUll as CodClas2, Null as DescripClas2,
		Null as CodClas3, Null as DescripClas3,
		Null as CodClas4, Null as DescripClas4,
		Null as CodClas5, Null as DescripClas5,
		Null as CodClas6, Null as DescripClas6,
		Null as CedulaVendedorRepuestos,
		Null as NombreVendedorRepuestos,
		Null as CedulaBodeguero,
		null as NombreBodeguero,
		isnull((select sum(isnull(t13.PrecioCoste,0)*t13.UT/t27.FactorConversionUT)
				from TA.TrabajoManoObras as t13 inner join TA.Trabajos as t27 on t27.PkFkEmpresas=t13.PkFkEmpresas and t27.PkFkCentros=t13.PkFkCentros and t27.PkFkAñoOT=t13.PkFkAñoOT and t27.PkFkSeries=t13.PkFkSeries and t27.PkFkNumOT=t13.PkFkNumOT and  t27.PkNumTrabajo_Iden=t13.PkFkNumTrabajo    
				where t1.PkFkEmpresas=t13.PkFkEmpresas and t1.PFCentroOT=t13.PkFkCentros and t1.PkFkAñoOT=t13.PkFkAñoOT and t1.PkFkSeries_OT=t13.PkFkSeries and t1.PkFkNumOT=t13.PkFkNumOT and t1.PkFkNumTrabajo=t13.PkFkNumTrabajo and t13.FechaBaja is null),0.0) as Coste,
		t38.PkImputacionTipos_Iden as IdImputaciontipos, t38.Descripcion as TipoImputacion, t1.Descripcion as DescripcionTrabajo,
		t1.FkMarcaTallerModelos,t39.FkTarifaTaller
FROM #fact as t1		   inner join TA.TrabajoManoObras as t4  on t1.PkFkEmpresas=t4.PkFkEmpresas and t4.PkFkCentros=t1.PFCentroOT and t1.PkFkAñoOT=t4.pkFkAñoOT and t1.PkFkSeries_OT=t4.pkFkSeries and t1.PkFkNumOT=t4.pkFkNumOT and t1.PkFkNumTrabajo=t4.pkFkNumTrabajo
						   inner join ta.TrabajoManoObrasEmpleados as t5  on t4.PkFkEmpresas = t5.PkFkEmpresas AND t4.PkFkCentros = t5.PkFkCentros AND t4.PkFkAñoOT = t5.PkFkAñoOT AND t4.PkFkSeries = t5.PkFkSeries AND t4.PkFkNumOT = t5.PkFkNumOT AND t4.PkFkNumTrabajo = t5.PkFkNumTrabajo AND t4.PkFkManoObraGrupos = t5.PkFkManoObraGrupos AND t4.PkTrabajoManoObras_Iden = t5.PkFkTrabajoManoObras
						   inner join cm.empresas as t6  on t1.pkfkempresas=t6.pkempresas
						   inner join cm.centros as t7  on t1.pkfkcentros=t7.pkcentros
						   INNER JOIN CM.Secciones AS t8  ON t1.FkSecciones = t8.PkSecciones_Iden
						   inner join cm.vehiculos as t9  on t1.fkvehiculos=t9.pkvehiculos_iden
						   LEFT OUTER JOIN CM.Terceros as t10   ON t1.FkTerceros = t10.PkTerceros
						   left outer JOIN CM.EmpresaCentroTerceros AS t11  ON t1.PkFkEmpresas = t11.PkFkEmpresas AND t1.pkFkCentros = t11.PkFkCentros AND t1.FkTerceros = t11.pkFkTerceros
						   left outer join CM.ClienteCategorias as t12  on t11.FkClienteCategorias=t12.PkClienteCategorias_Iden
						   left outer join ta.seccioncargos as t13  on  t1.PkFkEmpresas = t13.PkFkEmpresas AND t1.PFCentroOT = t13.PkFkCentros AND   t1.FkSecciones = t13.PkFkSecciones AND t1.FkSeccionCargos = t13.PkSeccionCargos

                           left outer join rh.empleados as t14  on t5.PkFkEmpleados=t14.pkEmpleados_Iden
						   left outer join cm.terceros as t15  on t14.fkterceros=t15.pkterceros
						   left outer join rh.empleados as t16  on t1.FkEmpleados_Alta=t16.pkEmpleados_Iden
						   left outer join cm.terceros as t17  on t16.fkterceros=t17.pkterceros
						   left outer join rh.empleados as t18  on t1.FkEmpleados_Responsable=t18.pkEmpleados_Iden
						   left outer join cm.terceros as t19  on t18.fkterceros=t19.pkterceros
						   left outer join rh.empleados as t20  on t1.FkEmpleados_Cierre=t20.pkEmpleados_Iden
						   left outer join cm.terceros as t21  on t20.fkterceros=t21.pkterceros
						   left outer join rh.empleados as t22  on t1.FkEmpleados_retirada=t22.pkEmpleados_Iden
						   left outer join cm.terceros as t23  on t22.fkterceros=t23.pkterceros

                           outer apply (SELECT SUM((t44.UT/100.00) * (t44.PrecioHora - t44.PrecioHora * t44.PorcDescuento) * t200.ImpuestoPorc) AS ImporteImpuesto
										 FROM TA.TrabajoManoObras as t44  inner join TA.TrabajoManoObrasImpuestos as t200  on t44.PkFkEmpresas = t200.PkFkEmpresas AND t44.PkFkCentros = t200.PkFKCentros AND t44.PkFkAñoOT = t200.PkFKAñoOT AND t44.PkFkSeries = t200.PkFkSeries AND t44.PkFkNumOT = t200.PkFkNumOT AND t44.PkFkNumTrabajo = t200.PkFkNumTrabajo AND t44.PkFkManoObraGrupos = t200.PkFkManoObraGrupos AND t44.PkTrabajoManoObras_Iden = t200.PkFkTrabajoManoObras
										 where t4.pkfkempresas=t44.pkfkempresas and t4.PkFkCentros=t44.PkFkCentros and t4.PkFkAñoOT=t44.PkFkAñoOT and 
												t4.PkFkSeries=t44.PkFkSeries and t4.PkFkNumOT=t44.PkFkNumOT and t4.PkFkNumTrabajo=t44.PkFkNumTrabajo and t4.PkFkManoObraGrupos=t44.PkFkManoObraGrupos and t4.PkTrabajoManoObras_Iden=t44.PkTrabajoManoObras_Iden
										) as t54

						   left outer join cm.marcas as t36  on t9.fkmarcas=t36.pkmarcas 
						   left outer join cm.gamas as t37  on  t9.fkmarcas=t37.pkfkmarcas and  t9.fkgamas=t37.pkgamas
						   left outer join CM.ImputacionTipos as t38  on t38.PkFkEmpresas=t1.PkFkEmpresas and t38.PkImputacionTipos_Iden=t1.FkImputacionTipos
						   left outer join TA.ManoObraCodigos as t39 on t9.FkMarcas=t39.PkFkMarcas and t1.FkMarcaTallerModelos=t39.PkFkMarcaTallerModelos
						                                               and t4.fkmanoobracodigos=t39.PkManoObraCodigos
																	   and t4.FkVariante=t39.PkVariante
where t4.fechabaja is null

union all
----**********************
----Ahora con los Varios
----**********************
SELECT year(t1.fechafactura) as Año,
		month(t1.fechafactura) as Mes,
		t1.pkfkempresas as CodigoEmpresa,
		t6.Nombre as Empresa,
		t1.pkfkcentros as CodigoCentro,
		t7.nombre as Centro,
		t1.fksecciones as CodigoSeccion,
		t8.descripcion as Seccion, 
		t1.PkFkAñoOT +' \\ '+ t1.PkFkSeries_OT + ' \\ ' + cast(t1.PkFkNumOT as nvarchar(20)) + ' \\ ' + cast(t1.PkFkNumTrabajo as nvarchar(20)) as NumOT,
		t1.PkAñoFactura +' \\ '+t1.PkFkSeries + ' \\ '+ t1.PkNumFactura as NumeroFacturaTaller,
		Null as NumeroAlbaran,
		t1.fechaAlta as FechaAperturaOrden,
		t1.FechaFactura,
		t1.fechaentrega,
		t9.matricula as Placa,
		t9.VIN,
		t9.FkServicioTipos,
		t9.fkmarcas as Marcaveh,
		t36.nombre as NombreMarca,
		t9.fkgamas as Gama,
		t37.nombre as NombreGama,
		t1.NifCif as NitCliente,
		replace(replace(replace(replace(replace(replace(t10.Nombre,char(13)+char(10)+' - ',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),'') 
		+ ' ' 
		+ replace(replace(replace(replace(replace(replace(isnull(t10.Apellido1,''),char(13)+char(10)+' - ',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),'')  
		+ ' '
		+ replace(replace(replace(replace(replace(replace(isnull(isnull(t10.Apellido2,''),''),char(13)+char(10)+' - ',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),'') 

		as NombreCliente,
		t11.FkClienteCategorias as CodigoCategoriaCliente,
		t12.descripcion as CategoriaCliente,
		t1.FkSeccionCargos as TipoCargo,
		t1.FkCargoTipos as TipoIntCargo,
		NUll as Marca,
		t4.FkVariosCodigos as Codigo,
		replace(replace(replace(replace(replace(replace(t4.descripcion ,char(13)+char(10)+' - ',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),'') as descripcion,
		' VAR ' as TipoOperacion,
		t4.precio as ValorUnitario,
		t4.Unidades as UnidadesVendidas,
		t4.porcdescuento *100.00 as PorcentajeDescuento,
		t54.ImporteImpuesto,

		t15.NifCif as CedulaOperario,
		t15.Nombre + ' ' + isnull(t15.Apellido1,'') + ' '+ isnull(t15.Apellido2,'') as NombreOperario,
		t15.NifCif as CedulaAsesorServicioAlta,
		t15.Nombre + ' ' + isnull(t15.Apellido1,'') + ' '+ isnull(t15.Apellido2,'') as AsesorServicioAlta,
		t19.NifCif as CedulaAsesorServicioResponsable,
		t19.Nombre + ' ' + isnull(t19.Apellido1,'') + ' '+ isnull(t19.Apellido2,'') as AsesorServicioResponsable,
		t21.NifCif as CedulaAsesorServicioCierre,
		t21.Nombre + ' ' + isnull(t21.Apellido1,'') + ' '+ isnull(t21.Apellido2,'') as AsesorServicioCierre,
		t23.NifCif as CedulaAsesorServicioRetirada,
		t23.Nombre + ' ' + isnull(t23.Apellido1,'') + ' '+ isnull(t23.Apellido2,'') as AsesorServicioRetirada,
		t1.trabajorepetido as TrabajoRetorno,
		(case when t1.FkNumPresupuesto is not null then 1 else 0 end) as Cotizacion,
		null as CampañaRepuesto,
		NULL as  CodClas1,NULL as DescripClas1,
		NUll as CodClas2, Null as DescripClas2,
		Null as CodClas3, Null as DescripClas3,
		Null as CodClas4, Null as DescripClas4,
		Null as CodClas5, Null as DescripClas5,
		Null as CodClas6, Null as DescripClas6,
		Null as CedulaVendedorRepuestos,
		Null as NombreVendedorRepuestos,
		Null as CedulaBodeguero,
		null as NombreBodeguero,
		NULL as Coste,
		t38.PkImputacionTipos_Iden as IdImputaciontipos, t38.Descripcion as TipoImputacion, t1.Descripcion as DescripcionTrabajo, NULL,NULL
FROM #fact as t1 		   inner join TA.TrabajoVarios as t4 on t1.PkFkEmpresas=t4.PkFkEmpresas and t1.PFCentroOT=t4.PkFkCentros and t1.PkFkAñoOT=t4.pkFkAñoOT and t1.PkFkSeries_OT=t4.pkFkSeries and t1.PkFkNumOT=t4.pkFkNumOT and t1.PkFkNumTrabajo=t4.pkFkNumTrabajo
						   inner join cm.empresas as t6  on t1.pkfkempresas=t6.pkempresas
						   inner join cm.centros as t7  on t1.pkfkcentros=t7.pkcentros
						   INNER JOIN CM.Secciones AS t8  ON t1.FkSecciones = t8.PkSecciones_Iden
						   inner join cm.vehiculos as t9  on t1.fkvehiculos=t9.pkvehiculos_iden
						   LEFT OUTER JOIN CM.Terceros as t10   ON t1.FkTerceros = t10.PkTerceros
						   left outer JOIN CM.EmpresaCentroTerceros AS t11  ON t1.PkFkEmpresas = t11.PkFkEmpresas AND t1.pkFkCentros = t11.PkFkCentros AND t1.FkTerceros = t11.pkFkTerceros
						   left outer join CM.ClienteCategorias as t12  on t11.FkClienteCategorias=t12.PkClienteCategorias_Iden
						   left outer join ta.seccioncargos as t13  on  t1.PkFkEmpresas = t13.PkFkEmpresas AND t1.PFCentroOT = t13.PkFkCentros AND   t1.FkSecciones = t13.PkFkSecciones AND t1.FkSeccionCargos = t13.PkSeccionCargos

                           left outer join rh.empleados as t14  on t1.FkEmpleados_Alta=t14.pkEmpleados_Iden
						   left outer join cm.terceros as t15  on t14.fkterceros=t15.pkterceros
						   --left outer join rh.empleados as t16  on t2.FkEmpleados_Alta=t16.pkEmpleados_Iden
						   --left outer join cm.terceros as t17  on t16.fkterceros=t17.pkterceros
						   left outer join rh.empleados as t18  on t1.FkEmpleados_Responsable=t18.pkEmpleados_Iden
						   left outer join cm.terceros as t19  on t18.fkterceros=t19.pkterceros
						   left outer join rh.empleados as t20  on t1.FkEmpleados_Cierre=t20.pkEmpleados_Iden
						   left outer join cm.terceros as t21  on t20.fkterceros=t21.pkterceros
						   left outer join rh.empleados as t22  on t1.FkEmpleados_retirada=t22.pkEmpleados_Iden
						   left outer join cm.terceros as t23  on t22.fkterceros=t23.pkterceros

                           OUTER APPLY (SELECT SUM(t44.Unidades * (t44.Precio - t44.Precio * t44.PorcDescuento) * t300.ImpuestoPorc) AS ImporteImpuesto
		                                FROM TA.TrabajoVarios as t44  inner join TA.TrabajosVariosImpuestos as t300  on t44.PkFKEmpresas = t300.PkFkEmpresas AND t44.PkFkCentros = t300.PkFkCentros AND t44.PkFkAñoOT = t300.PkFkAñoOT AND                                      t44.PkFkSeries = t300.PkFkSeries AND t44.PkFkNumOT = t300.PkFkNumOT AND                                      t44.PkFkNumTrabajo = t300.PkFkNumTrabajo AND                                      t44.PkTrabajoVarios_Iden = t300.PkFkTrabajoVarios
										where t4.pkfkempresas=t44.pkfkempresas and t4.PkFkCentros=t44.PkFkCentros and t4.PkFkAñoOT=t44.PkFkAñoOT and t4.PkFkSeries=t44.PkFkSeries and t4.PkFkNumOT=t44.PkFkNumOT and t4.PkFkNumTrabajo=t44.PkFkNumTrabajo and t4.PkTrabajoVarios_Iden=t44.PkTrabajoVarios_Iden
									   ) as t54

						   left outer join cm.marcas as t36  on t9.fkmarcas=t36.pkmarcas 
						   left outer join cm.gamas as t37  on  t9.fkmarcas=t37.pkfkmarcas and  t9.fkgamas=t37.pkgamas						   
						   left outer join CM.ImputacionTipos as t38  on t38.PkFkEmpresas=t1.PkFkEmpresas and t38.PkImputacionTipos_Iden=t1.FkImputacionTipos
where t4.fechabaja is null

union all
--------**********************
--------Ahora con Pintura
--------**********************
SELECT year(t1.fechafactura) as Año,
		month(t1.fechafactura) as Mes,
		t1.pkfkempresas as CodigoEmpresa,
		t6.Nombre as Empresa,
		t1.pkfkcentros as CodigoCentro,
		t7.nombre as Centro,
		t1.fksecciones as CodigoSeccion,
		t8.descripcion as Seccion, 
		t1.PkFkAñoOT +' \\ '+ t1.PkFkSeries_OT + ' \\ ' + cast(t1.PkFkNumOT as nvarchar(20)) + ' \\ ' + cast(t1.PkFkNumTrabajo as nvarchar(20)) as NumOT,
		t1.PkAñoFactura +' \\ '+t1.PkFkSeries + ' \\ '+ t1.PkNumFactura as NumeroFacturaTaller,
		Null as NumeroAlbaran,
		t1.fechaAlta as FechaAperturaOrden,
		t1.FechaFactura,
		t1.fechaentrega,
		t9.matricula as Placa,
		t9.VIN,
		t9.FkServicioTipos,
		t9.fkmarcas as Marcaveh,
		t36.nombre as NombreMarca,
		t9.fkgamas as Gama,
		t37.nombre as NombreGama,
		t1.NifCif as NitCliente,
		replace(replace(replace(replace(replace(replace(t10.Nombre,char(13)+char(10)+' - ',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),'') 
		+ ' ' 
		+ replace(replace(replace(replace(replace(replace(isnull(t10.Apellido1,''),char(13)+char(10)+' - ',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),'')  
		+ ' '
		+ replace(replace(replace(replace(replace(replace(isnull(isnull(t10.Apellido2,''),''),char(13)+char(10)+' - ',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),'') 

		as NombreCliente,
		t11.FkClienteCategorias as CodigoCategoriaCliente,
		t12.descripcion as CategoriaCliente,
		t1.FkSeccionCargos as TipoCargo,
		t1.FkCargoTipos as TipoIntCargo,
		NUll as Marca,
		cast(t4.PkTrabajoPinturas_Iden as nvarchar(10)) as Codigo,
		replace(replace(replace(replace(replace(replace(t4.descripcion ,char(13)+char(10)+' - ',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),'') as descripcion,
		' PIN ' as TipoOperacion,
		t4.precio as ValorUnitario,
		t4.Unidades as UnidadesVendidas,
		t4.porcdescuento *100.00 as PorcentajeDescuento,
		t54.ImporteImpuesto,

		t15.NifCif as CedulaOperario,
		t15.Nombre + ' ' + isnull(t15.Apellido1,'') + ' '+ isnull(t15.Apellido2,'') as NombreOperario,
		t15.NifCif as CedulaAsesorServicioAlta,
		t15.Nombre + ' ' + isnull(t15.Apellido1,'') + ' '+ isnull(t15.Apellido2,'') as AsesorServicioAlta,
		t19.NifCif as CedulaAsesorServicioResponsable,
		t19.Nombre + ' ' + isnull(t19.Apellido1,'') + ' '+ isnull(t19.Apellido2,'') as AsesorServicioResponsable,
		t21.NifCif as CedulaAsesorServicioCierre,
		t21.Nombre + ' ' + isnull(t21.Apellido1,'') + ' '+ isnull(t21.Apellido2,'') as AsesorServicioCierre,
		t23.NifCif as CedulaAsesorServicioRetirada,
		t23.Nombre + ' ' + isnull(t23.Apellido1,'') + ' '+ isnull(t23.Apellido2,'') as AsesorServicioRetirada,
		t1.trabajorepetido as TrabajoRetorno,
		(case when t1.FkNumPresupuesto is not null then 1 else 0 end) as Cotizacion,
		null as CampañaRepuesto,
		NULL as  CodClas1,NULL as DescripClas1,
		NUll as CodClas2, Null as DescripClas2,
		Null as CodClas3, Null as DescripClas3,
		Null as CodClas4, Null as DescripClas4,
		Null as CodClas5, Null as DescripClas5,
		Null as CodClas6, Null as DescripClas6,
		Null as CedulaVendedorRepuestos,
		Null as NombreVendedorRepuestos,
		Null as CedulaBodeguero,
		null as NombreBodeguero,
		isnull((select sum(isnull(t20.PrecioCoste,0)*t20.Unidades)
				from TA.TrabajoPinturas as t20 
				where t1.PkFkEmpresas=t20.PkFkEmpresas and t1.PFCentroOT=t20.PkFkCentros and t1.PkFkAñoOT=t20.PkFkAñoOT and t1.PkFkSeries_OT=t20.PkFkSeries and t1.PkFkNumOT=t20.PkFkNumOT and t1.PkFkNumTrabajo=t20.PkFkNumTrabajo
					  and t20.FechaBaja is null),0.0) as Coste,
		t38.PkImputacionTipos_Iden as IdImputaciontipos, t38.Descripcion as TipoImputacion, t1.Descripcion as DescripcionTrabajo,NULL,NULL
FROM #fact as t1		   inner join TA.TrabajoPinturas as t4  on t1.PkFkEmpresas=t4.PkFkEmpresas and t1.PkFkAñoOT=t4.pkFkAñoOT and t1.PkFkSeries_OT=t4.pkFkSeries and t1.PkFkNumOT=t4.pkFkNumOT and t1.PkFkNumTrabajo=t4.pkFkNumTrabajo
						   inner join cm.empresas as t6  on t1.pkfkempresas=t6.pkempresas
						   inner join cm.centros as t7  on t1.pkfkcentros=t7.pkcentros
						   INNER JOIN CM.Secciones AS t8  ON t1.FkSecciones = t8.PkSecciones_Iden
						   inner join cm.vehiculos as t9  on t1.fkvehiculos=t9.pkvehiculos_iden
						   LEFT OUTER JOIN CM.Terceros as t10   ON t1.FkTerceros = t10.PkTerceros
						   left outer JOIN CM.EmpresaCentroTerceros AS t11  ON t1.PkFkEmpresas = t11.PkFkEmpresas AND t1.pkFkCentros = t11.PkFkCentros AND t1.FkTerceros = t11.pkFkTerceros
						   left outer join CM.ClienteCategorias as t12  on t11.FkClienteCategorias=t12.PkClienteCategorias_Iden
						   left outer join ta.seccioncargos as t13  on  t1.PkFkEmpresas = t13.PkFkEmpresas AND t1.PFCentroOT = t13.PkFkCentros AND   t1.FkSecciones = t13.PkFkSecciones AND t1.FkSeccionCargos = t13.PkSeccionCargos

                           left outer join rh.empleados as t14  on t1.FkEmpleados_Alta=t14.pkEmpleados_Iden
						   left outer join cm.terceros as t15  on t14.fkterceros=t15.pkterceros
						   --left outer join rh.empleados as t16  on t2.FkEmpleados_Alta=t16.pkEmpleados_Iden
						   --left outer join cm.terceros as t17  on t16.fkterceros=t17.pkterceros
						   left outer join rh.empleados as t18  on t1.FkEmpleados_Responsable=t18.pkEmpleados_Iden
						   left outer join cm.terceros as t19  on t18.fkterceros=t19.pkterceros
						   left outer join rh.empleados as t20  on t1.FkEmpleados_Cierre=t20.pkEmpleados_Iden
						   left outer join cm.terceros as t21  on t20.fkterceros=t21.pkterceros
						   left outer join rh.empleados as t22  on t1.FkEmpleados_retirada=t22.pkEmpleados_Iden
						   left outer join cm.terceros as t23  on t22.fkterceros=t23.pkterceros

                           outer apply (SELECT SUM(t44.Unidades * (t44.Precio - t44.Precio * t44.PorcDescuento) * t400.ImpuestoPorc) AS ImporteImpuesto
										FROM TA.TrabajoPinturas as t44  inner join TA.TrabajoPinturaImpuestos as t400  ON t44.PkFkEmpresas = t400.PkFkEmpresas AND t44.PkFkCentros = t400.PkFkCentros AND t44.PkFkAñoOT = t400.PkFKAñoOT AND t44.PkFkSeries = t400.PkFkSeries AND t44.PkFkNumOT = t400.PkFkNumOT AND t44.PkFkNumTrabajo = t400.PkFkNumTrabajo AND t44.PkTrabajoPinturas_Iden = t400.PkFkTrabajoPinturas
										where t4.pkfkempresas=t44.pkfkempresas and t4.PkFkCentros=t44.PkFkCentros and t4.PkFkAñoOT=t44.PkFkAñoOT and t4.PkFkSeries=t44.PkFkSeries and t4.PkFkNumOT=t44.PkFkNumOT and t4.PkFkNumTrabajo=t44.PkFkNumTrabajo and t4.PkTrabajoPinturas_Iden=t44.PkTrabajoPinturas_Iden
									   ) as t54

						   left outer join cm.marcas as t36  on t9.fkmarcas=t36.pkmarcas 
						   left outer join cm.gamas as t37  on  t9.fkmarcas=t37.pkfkmarcas and  t9.fkgamas=t37.pkgamas
						   left outer join CM.ImputacionTipos as t38  on t38.PkFkEmpresas=t1.PkFkEmpresas and t38.PkImputacionTipos_Iden=t1.FkImputacionTipos

where t4.fechabaja is null

union all
------**********************
------Subcontratado
------**********************
SELECT year(t1.fechafactura) as Año,
		month(t1.fechafactura) as Mes,
		t1.pkfkempresas as CodigoEmpresa,
		t6.Nombre as Empresa,
		t1.pkfkcentros as CodigoCentro,
		t7.nombre as Centro,
		t1.fksecciones as CodigoSeccion,
		t8.descripcion as Seccion, 
		t1.PkFkAñoOT +' \\ '+ t1.PkFkSeries_OT + ' \\ ' + cast(t1.PkFkNumOT as nvarchar(20)) + ' \\ ' + cast(t1.PkFkNumTrabajo as nvarchar(20)) as NumOT,
		t1.PkAñoFactura +' \\ '+t1.PkFkSeries + ' \\ '+ t1.PkNumFactura as NumeroFacturaTaller,
		t31.PkAñoEntradaTrabajosExternos +' \\ '+ cast(t31.PkFkTerceros as nvarchar(10)) +' \\ '+ t31.PkSeries_EntradasTrabajosExternos +' \\ '+  t31.PkEntradasTrabajosExternos as NumeroAlbaran,
		t1.fechaAlta as FechaAperturaOrden,
		t1.FechaFactura,
		t1.fechaentrega,
		t9.matricula as Placa,
		t9.VIN,
		t9.FkServicioTipos,
		t9.fkmarcas as Marcaveh,
		t36.nombre as NombreMarca,
		t9.fkgamas as Gama,
		t37.nombre as NombreGama,
		t1.NifCif as NitCliente,
		replace(replace(replace(replace(replace(replace(t10.Nombre,char(13)+char(10)+' - ',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),'') 
		+ ' ' 
		+ replace(replace(replace(replace(replace(replace(isnull(t10.Apellido1,''),char(13)+char(10)+' - ',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),'')  
		+ ' '
		+ replace(replace(replace(replace(replace(replace(isnull(isnull(t10.Apellido2,''),''),char(13)+char(10)+' - ',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),'') 

		as NombreCliente,
		t11.FkClienteCategorias as CodigoCategoriaCliente,
		t12.descripcion as CategoriaCliente,
		t1.FkSeccionCargos as TipoCargo,
		t1.FkCargoTipos as TipoIntCargo,
		NUll as Marca,
		cast(t4.FkArticulos as nvarchar(10)) as Codigo,
		replace(replace(replace(replace(replace(replace(t4.descripcion ,char(13)+char(10)+' - ',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),'') as descripcion,
		' SUB ' as TipoOperacion,
		t4.precioventa as ValorUnitario,
		t4.Unidades as UnidadesVendidas,
		t4.dtoporcVenta *100.00 as PorcentajeDescuento,
		t4.Unidades * (t4.Precioventa - t4.Precioventa * t4.DtoPorcVenta) * t4.PorcImpuestosVenta as ImporteImpuesto,

		t15.NifCif as CedulaOperario,
		t15.Nombre + ' ' + isnull(t15.Apellido1,'') + ' '+ isnull(t15.Apellido2,'') as NombreOperario,
		t15.NifCif as CedulaAsesorServicioAlta,
		t15.Nombre + ' ' + isnull(t15.Apellido1,'') + ' '+ isnull(t15.Apellido2,'') as AsesorServicioAlta,
		t19.NifCif as CedulaAsesorServicioResponsable,
		t19.Nombre + ' ' + isnull(t19.Apellido1,'') + ' '+ isnull(t19.Apellido2,'') as AsesorServicioResponsable,
		t21.NifCif as CedulaAsesorServicioCierre,
		t21.Nombre + ' ' + isnull(t21.Apellido1,'') + ' '+ isnull(t21.Apellido2,'') as AsesorServicioCierre,
		t23.NifCif as CedulaAsesorServicioRetirada,
		t23.Nombre + ' ' + isnull(t23.Apellido1,'') + ' '+ isnull(t23.Apellido2,'') as AsesorServicioRetirada,
		t1.trabajorepetido as TrabajoRetorno,
		(case when t1.FkNumPresupuesto is not null then 1 else 0 end) as Cotizacion,
		null as CampañaRepuesto,
		NULL as  CodClas1,NULL as DescripClas1,
		NUll as CodClas2, Null as DescripClas2,
		Null as CodClas3, Null as DescripClas3,
		Null as CodClas4, Null as DescripClas4,
		Null as CodClas5, Null as DescripClas5,
		Null as CodClas6, Null as DescripClas6,
		t33.nifcif as CedulaVendedorRepuestos,
		t33.Nombre + ' ' + isnull(t33.Apellido1,'') + ' '+ isnull(t33.Apellido2,'') as NombreVendedorRepuestos,
		NULL as CedulaBodeguero,
		NULL as NombreBodeguero,
		isnull((select sum(((t15.PrecioCompra+case when t15.ImporteCompraExento is null then 0 else t15.ImporteCompraExento end)*t15.Unidades)- ((t15.PrecioCompra+case when t15.ImporteCompraExento is null then 0 else t15.ImporteCompraExento end)*t15.Unidades*t15.PorcDescuentoCompra))
					 from TA.TrabajoSubcontratadosDet as t15 
					 where t1.PkFkEmpresas=t15.PkFkEmpresas and t1.PFCentroOT=t15.PkFkCentros and t1.PkFkAñoOT=t15.FkAñoOT and t1.PkFkSeries_OT=t15.FkSeries and t1.PkFkNumOT=t15.FkNumOT and t1.PkFkNumTrabajo=t15.FkNumTrabajo
							  and t15.FechaBaja is null)
				  ,0.0)   
				  +
		isnull((select sum(((t19.PrecioCompra+case when t19.ImporteExento is null then 0 else t19.ImporteExento end)*t19.Unidades)- ((t19.PrecioCompra+case when t19.ImporteExento is null then 0 else t19.ImporteExento end)*t19.Unidades*t19.DtoPorcCompra))
					 from TA.EntradasTrabajosExternosDet as t19 
					 where t1.PkFkEmpresas=t19.PkFkEmpresas and t1.PFCentroOT=t19.FkCentros and t1.PkFkAñoOT=t19.FkAñoOT and t1.PkFkSeries_OT=t19.FkSeries_OT and t1.PkFkNumOT=t19.FkNumOT and t1.PkFkNumTrabajo=t19.FkNumTrabajo
							  and t19.FechaBaja is null),0.0)
					 as Coste,
		t38.PkImputacionTipos_Iden as IdImputaciontipos, t38.Descripcion as TipoImputacion, t1.Descripcion as DescripcionTrabajo,NULL,NULL
FROM #fact as t1		   inner join ta.EntradasTrabajosExternosDet as t4  on t1.PkFkEmpresas=t4.PkFkEmpresas and t1.PFCentroOT=t4.Fkcentros and t1.PkFkAñoOT=t4.FkAñoOT and t1.PkFkSeries_OT=t4.FkSeries_OT and t1.PkFkNumOT=t4.FkNumOT and t1.PkFkNumTrabajo=t4.FkNumTrabajo
						   inner join cm.empresas as t6  on t1.pkfkempresas=t6.pkempresas
						   inner join cm.centros as t7  on t1.pkfkcentros=t7.pkcentros
						   INNER JOIN CM.Secciones AS t8  ON t1.FkSecciones = t8.PkSecciones_Iden
						   inner join cm.vehiculos as t9  on t1.fkvehiculos=t9.pkvehiculos_iden
						   LEFT OUTER JOIN CM.Terceros as t10   ON t1.FkTerceros = t10.PkTerceros
						   left outer JOIN CM.EmpresaCentroTerceros AS t11  ON t1.PkFkEmpresas = t11.PkFkEmpresas AND t1.pkFkCentros = t11.PkFkCentros AND t1.FkTerceros = t11.pkFkTerceros
						   left outer join CM.ClienteCategorias as t12  on t11.FkClienteCategorias=t12.PkClienteCategorias_Iden
						   left outer join ta.seccioncargos as t13  on  t1.PkFkEmpresas = t13.PkFkEmpresas AND t1.PFCentroOT = t13.PkFkCentros AND   t1.FkSecciones = t13.PkFkSecciones AND t1.FkSeccionCargos = t13.PkSeccionCargos

                           left outer join rh.empleados as t14  on t1.FkEmpleados_Alta=t14.pkEmpleados_Iden
						   left outer join cm.terceros as t15  on t14.fkterceros=t15.pkterceros
						   --left outer join rh.empleados as t16  on t2.FkEmpleados_Alta=t16.pkEmpleados_Iden
						   --left outer join cm.terceros as t17  on t16.fkterceros=t17.pkterceros
						   left outer join rh.empleados as t18  on t1.FkEmpleados_Responsable=t18.pkEmpleados_Iden
						   left outer join cm.terceros as t19  on t18.fkterceros=t19.pkterceros
						   left outer join rh.empleados as t20  on t1.FkEmpleados_Cierre=t20.pkEmpleados_Iden
						   left outer join cm.terceros as t21  on t20.fkterceros=t21.pkterceros
						   left outer join rh.empleados as t22  on t1.FkEmpleados_retirada=t22.pkEmpleados_Iden
						   left outer join cm.terceros as t23  on t22.fkterceros=t23.pkterceros

                           inner join ta.EntradasTrabajosExternos as t31  on t4.PkFkEmpresas=t31.PkFkEmpresas and t4.PkfkAñoEntradaTrabajosExternos=t31.PkAñoEntradaTrabajosExternos and t4.PkFkTerceros=t31.PkFkTerceros and t4.PkfkSeries_EntradasTrabajosExternos=t31.PkSeries_EntradasTrabajosExternos and t4.PkfkEntradasTrabajosExternos=t31.PkEntradasTrabajosExternos
						   LEFT OUTER JOIN RH.Empleados as t32   ON t31.FkEmpleados = t32.PkEmpleados_Iden 
						   LEFT OUTER JOIN CM.Terceros as t33   ON t32.FkTerceros = t33.PkTerceros
						   left outer join cm.marcas as t36  on t9.fkmarcas=t36.pkmarcas 
						   left outer join cm.gamas as t37  on t9.fkmarcas=t37.pkfkmarcas and  t9.fkgamas=t37.pkgamas
						   left outer join CM.ImputacionTipos as t38  on t38.PkFkEmpresas=t1.PkFkEmpresas and t38.PkImputacionTipos_Iden=t1.FkImputacionTipos
where t4.fechabaja is null
option (loop join)
--
```
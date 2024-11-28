# Stored Procedure: sp_Presupuestos_CalcularParametrosPyG_USC

## Usa los objetos:
- [[Presupuestos_Definitivos]]
- [[Presupuestos_Definitivos_Balances]]
- [[Presupuestos_Diversos]]
- [[Presupuestos_Inmuebles]]
- [[Presupuestos_Nomina]]
- [[Presupuestos_Vehiculos]]

```sql

CREATE PROCEDURE [dbo].[sp_Presupuestos_CalcularParametrosPyG_USC]

    @IdClase SMALLINT,  
	@CodigoLinea SMALLINT,
	@CodigoCentro SMALLINT,
	@AnoPeriodo SMALLINT,
	@Mes_Periodo SMALLINT

AS
BEGIN

    DECLARE @ValorGastosDeVentas DECIMAL(18, 2);
	DECLARE @ValorGastosDeOperacion DECIMAL(18, 2);
	DECLARE @ValorComicionesATerceros DECIMAL(18, 2);
	DECLARE @ValorGastosViaje DECIMAL(18, 2);
	DECLARE @ValorFeriasExposiciones DECIMAL(18, 2);
	DECLARE @ValorPropagandaYPublicidad DECIMAL(18, 2);
	DECLARE @ValorTraspasosYMatriculas DECIMAL(18, 2);
	DECLARE @ValorGastosContactCenterYDigital DECIMAL(18, 2);
	DECLARE @ValorGastosPersonal DECIMAL(18, 2);
	DECLARE @ValorSalariosIntegrales DECIMAL(18, 2);
	DECLARE @ValorSueldos DECIMAL(18, 2);
	DECLARE @ValorHorasExtrasYRecargos DECIMAL(18, 2);
	DECLARE @ValorSubsidioTransporte DECIMAL(18, 2);
	DECLARE @ValorPrestacionesYAportes DECIMAL(18, 2);
	DECLARE @ValorOtrosGastos DECIMAL(18, 2);
	DECLARE @ValorAuxilioTransporte DECIMAL(18, 2);
	DECLARE @ValorCapacitacionPersonal DECIMAL(18, 2);
	DECLARE @ValorBonosAlPersonal DECIMAL(18, 2);
	DECLARE @ValorDotacion DECIMAL(18, 2);	
	DECLARE @ValorTemporales DECIMAL(18, 2);
	DECLARE @ValorSeguridadIndustrial DECIMAL(18, 2);
	DECLARE @ValorGPMonetizacionesSena DECIMAL(18, 2);
	DECLARE @ValorGastosGenerales DECIMAL(18, 2);
	DECLARE @ValorImpuestos DECIMAL(18, 2);
	DECLARE @ArriendoMesAumento DECIMAL(18, 2);
	DECLARE @ValorArrendamientoBienesInmuebles DECIMAL(18, 2);
	DECLARE @ValorArrendamientoBienesMuebles DECIMAL(18, 2);
	DECLARE @ValorMantenimientoYReparaciones DECIMAL(18, 2);
	DECLARE @ValorConstruccionesyEdificaciones DECIMAL(18, 2);
	DECLARE @ValorEquipoDeOficina DECIMAL(18, 2);
	DECLARE @ValorGastosDeSistemas DECIMAL(18, 2);
	DECLARE @ValorDepreciaciones DECIMAL(18, 2);
	DECLARE @ValorGGDepMaquinariayEquip DECIMAL(18, 2);	
	DECLARE @ValorGGDepMueblesyEnseres DECIMAL(18, 2);
	DECLARE @ValorGGDepEquiposcomputoyComunicacion DECIMAL(18, 2);
	DECLARE @ValorGGDepFlotayEquipoDetransporte DECIMAL(18, 2);
	DECLARE @ValorDiversos DECIMAL(18, 2);
	DECLARE @ValorServiciosyElementosDeAseoyCafeteria DECIMAL(18, 2);
	DECLARE @ValorDIVServicioDeAseo DECIMAL(18, 2);
	DECLARE @ValorDIVInsumosDeAseo DECIMAL(18, 2);
	DECLARE @ValorUtilesPapeleriaFotocopias DECIMAL(18, 2);
	DECLARE @ValorVigilancia DECIMAL(18, 2);
	DECLARE @ValorEncuadernacionyEmpaste DECIMAL(18, 2);
	DECLARE @ValorGastosAmbientales DECIMAL(18, 2);

	--DECLARE @IdClase SMALLINT = 1;
	--DECLARE @CodigoLinea SMALLINT = 4;
	--DECLARE @CodigoCentro SMALLINT = 48;
	--DECLARE @AnoPeriodo SMALLINT = 2025;
	--DECLARE @Mes_Periodo SMALLINT = 1;



	-- Actualizar el registro Gastos Ambientales

	SET @ValorGastosAmbientales = ISNULL((SELECT Gastos_Ambientales
    FROM Presupuestos_Diversos
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	0), 0);

	UPDATE Presupuestos_Definitivos
    SET Valor = @ValorGastosAmbientales
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	@Mes_Periodo
	AND IdJerarquia		=	246; /* Gastos Ambientales */

	-- Actualizar el registro Encuadernación y Empaste

	SET @ValorEncuadernacionyEmpaste = ISNULL((SELECT Encuadernacion_y_Empaste
    FROM Presupuestos_Diversos
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	0), 0);

	UPDATE Presupuestos_Definitivos
    SET Valor = @ValorEncuadernacionyEmpaste
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	@Mes_Periodo
	AND IdJerarquia		=	238; /* Encuadernación y Empaste */

	-- Actualizar el registro Vigilancia

	SET @ValorVigilancia = ISNULL((SELECT Vigilancia
    FROM Presupuestos_Diversos
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	0), 0);

	UPDATE Presupuestos_Definitivos
    SET Valor = @ValorVigilancia
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	@Mes_Periodo
	AND IdJerarquia		=	236; /* Vigilancia */

	-- Actualizar el registro Utiles_Papeleria_Fotocopias

	SET @ValorUtilesPapeleriaFotocopias = ISNULL((SELECT Utiles_Papeleria_Fotocopias
    FROM Presupuestos_Diversos
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	0), 0);

	UPDATE Presupuestos_Definitivos
    SET Valor = @ValorUtilesPapeleriaFotocopias
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	@Mes_Periodo
	AND IdJerarquia		=	232; /* Utiles_Papeleria_Fotocopias */

	-- Actualizar el registro DIV Insumos_de_Aseo

	SET @ValorDIVInsumosDeAseo = ISNULL((SELECT DIV_Insumos_de_Aseo
    FROM Presupuestos_Diversos
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	0), 0);

	UPDATE Presupuestos_Definitivos
    SET Valor = @ValorDIVInsumosDeAseo
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	@Mes_Periodo
	AND IdJerarquia		=	231; /* DIV Insumos_de_Aseo */

	-- Actualizar el registro DIV Servicio de aseo

	SET @ValorDIVServicioDeAseo = ISNULL((SELECT DIV_Servicio_Aseo
    FROM Presupuestos_Diversos
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	0), 0) ;

	UPDATE Presupuestos_Definitivos
    SET Valor = @ValorDIVServicioDeAseo
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	@Mes_Periodo
	AND IdJerarquia		=	230; /* DIV Servicio de aseo */

	-- Actualizar el registro Servicios y elementos de Aseo y Cafetería

	SET @ValorServiciosyElementosDeAseoyCafeteria =  @ValorDIVServicioDeAseo + @ValorDIVInsumosDeAseo

    UPDATE Presupuestos_Definitivos
    SET Valor = @ValorServiciosyElementosDeAseoyCafeteria
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	@Mes_Periodo
	AND IdJerarquia		=	229; /* Servicios y elementos de Aseo y Cafetería */

	-- Actualizar el registro Diversos

	SELECT @ValorDiversos = SUM(Valor)  + @ValorServiciosyElementosDeAseoyCafeteria
										+ @ValorUtilesPapeleriaFotocopias 
										+ @ValorVigilancia
										+ @ValorEncuadernacionyEmpaste
										+ @ValorGastosAmbientales
    FROM Presupuestos_Definitivos
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	@Mes_Periodo
	AND IdJerarquia     IN  (227, 228, 233, 234, 235, 237, 239, 240, 241, 242, 243, 244, 245, 247, 248, 249);

    UPDATE Presupuestos_Definitivos
    SET Valor = @ValorDiversos
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	@Mes_Periodo
	AND IdJerarquia		=	226; /* Diversos */

	-- Actualizar el registro GG Dep Flota y Equipo de transporte

	SET @ValorGGDepFlotayEquipoDetransporte = ISNULL((SELECT Valor
    FROM Presupuestos_Definitivos_Balances
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	@Mes_Periodo
	AND IdJerarquia     =	222), 0);

    UPDATE Presupuestos_Definitivos
    SET Valor = @ValorGGDepFlotayEquipoDetransporte
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	@Mes_Periodo
	AND IdJerarquia		=	222; /* GG GG Dep Flota y Equipo de transporte */

	-- Actualizar el registro GG Dep Equipos de cómputo y comunicación

	SET @ValorGGDepEquiposcomputoyComunicacion = ISNULL((SELECT Valor
    FROM Presupuestos_Definitivos_Balances
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	@Mes_Periodo
	AND IdJerarquia     =	221), 0);

    UPDATE Presupuestos_Definitivos
    SET Valor = @ValorGGDepEquiposcomputoyComunicacion
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	@Mes_Periodo
	AND IdJerarquia		=	221; /* GG Dep Equipos de cómputo y comunicación */

	-- Actualizar el registro GG Dep Muebles y enseres

	SET @ValorGGDepMueblesyEnseres = ISNULL((SELECT Valor
    FROM Presupuestos_Definitivos_Balances
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	@Mes_Periodo
	AND IdJerarquia     =	220), 0);

    UPDATE Presupuestos_Definitivos
    SET Valor = @ValorGGDepMueblesyEnseres
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	@Mes_Periodo
	AND IdJerarquia		=	220; /* GG Dep Muebles y enseres */

	-- Actualizar el registro GG Dep Maquinaria y Equipo

	SET @ValorGGDepMaquinariayEquip = ISNULL((SELECT Valor
    FROM Presupuestos_Definitivos_Balances
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	@Mes_Periodo
	AND IdJerarquia     =	219), 0);

    UPDATE Presupuestos_Definitivos
    SET Valor = @ValorGGDepMaquinariayEquip
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	@Mes_Periodo
	AND IdJerarquia		=	219; /* GG Dep Maquinaria y Equipo */

	-- Actualizar el registro Depreciaciones

	SET @ValorDepreciaciones  = @ValorGGDepMaquinariayEquip
							  + @ValorGGDepMueblesyEnseres
							  + @ValorGGDepEquiposcomputoyComunicacion
							  + @ValorGGDepFlotayEquipoDetransporte

    UPDATE Presupuestos_Definitivos
    SET Valor = @ValorDepreciaciones
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	@Mes_Periodo
	AND IdJerarquia		=	218; /* Depreciaciones */

	 -- Actualizar el registro Gastos de Sistemas

	SELECT @ValorGastosDeSistemas = SUM(Valor)
    FROM Presupuestos_Definitivos
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	@Mes_Periodo
	AND IdJerarquia     IN  (213, 214, 215, 216, 217);

    UPDATE Presupuestos_Definitivos
    SET Valor = @ValorGastosDeSistemas
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	@Mes_Periodo
	AND IdJerarquia		=	212; /* Gastos de Sistemas */

	-- Actualizar el registro Equipo_de_oficina

	SET @ValorEquipoDeOficina = ISNULL((SELECT Equipo_de_oficina 
    FROM Presupuestos_Diversos
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	0), 0);

	UPDATE Presupuestos_Definitivos
    SET Valor = @ValorEquipoDeOficina
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	@Mes_Periodo
	AND IdJerarquia		=	209; /* Equipo_de_oficina */

	-- Actualizar el registro Construcciones_y_Edificaciones

	SET @ValorConstruccionesyEdificaciones = ISNULL((SELECT Construcciones_y_Edificaciones
    FROM Presupuestos_Diversos
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	0), 0);

	UPDATE Presupuestos_Definitivos
    SET Valor = @ValorConstruccionesyEdificaciones
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	@Mes_Periodo
	AND IdJerarquia		=	207; /* Construcciones_y_Edificaciones */

	-- Actualizar el registro Mantenimiento y Reparaciones

	SELECT @ValorMantenimientoYReparaciones = SUM(Valor) + @ValorConstruccionesyEdificaciones
														 + @ValorEquipoDeOficina
    FROM Presupuestos_Definitivos
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	@Mes_Periodo
	AND IdJerarquia     IN  (208, 210);


    UPDATE Presupuestos_Definitivos
    SET Valor = @ValorMantenimientoYReparaciones
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	@Mes_Periodo
	AND IdJerarquia		=	206; /* Mantenimiento y Reparaciones */

	-- Actualizar el registro Arrendamiento bienes muebles

	SET @ValorArrendamientoBienesMuebles = ISNULL((SELECT Valor_Arriendo
    FROM Presupuestos_Vehiculos
    WHERE CodigoLinea	=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo), 0);

    UPDATE Presupuestos_Definitivos
    SET Valor = @ValorArrendamientoBienesMuebles
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	@Mes_Periodo
	AND IdJerarquia		=	201; /* Arrendamiento bienes muebles */
	
	-- Actualizar el registro Arrendamiento Bienes Inmuebles

	SET @ArriendoMesAumento = ISNULL((SELECT Arriendo_Mes_Aumento
    FROM Presupuestos_Inmuebles
    WHERE CodigoLinea	=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo), 0);
	
	if(@Mes_Periodo >= @ArriendoMesAumento)

		SET @ValorArrendamientoBienesInmuebles = ISNULL((SELECT Arriendo_Futuro
		FROM Presupuestos_Inmuebles
		WHERE CodigoLinea	=	@CodigoLinea
		AND CodigoCentro	=	@CodigoCentro
		AND Ano_Periodo		=	@AnoPeriodo), 0);

	else
		
		SET @ValorArrendamientoBienesInmuebles = ISNULL((SELECT Arriendo_Inicial
		FROM Presupuestos_Inmuebles
		WHERE CodigoLinea	=	@CodigoLinea
		AND CodigoCentro	=	@CodigoCentro
		AND Ano_Periodo		=	@AnoPeriodo), 0);

	UPDATE Presupuestos_Definitivos
	SET Valor = @ValorArrendamientoBienesInmuebles
	WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	@Mes_Periodo
	AND IdJerarquia		=	200; /* Impuestos */

	-- Actualizar el registro Arrendamientos

    UPDATE Presupuestos_Definitivos
    SET Valor = @ValorArrendamientoBienesInmuebles + @ValorArrendamientoBienesMuebles
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	@Mes_Periodo
	AND IdJerarquia		=	199; /* Arrendamientos */

	-- Actualizar el registro Impuestos

	SELECT @ValorImpuestos = SUM(Valor)
    FROM Presupuestos_Definitivos
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	@Mes_Periodo
	AND IdJerarquia     IN  (197, 198);

    UPDATE Presupuestos_Definitivos
    SET Valor = @ValorImpuestos
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	@Mes_Periodo
	AND IdJerarquia		=	196; /* Impuestos */

	-- Actualizar el registro Gastos Generales

	SELECT @ValorGastosGenerales = SUM(Valor) + @ValorImpuestos
											  + @ValorArrendamientoBienesInmuebles 
											  + @ValorArrendamientoBienesMuebles
											  + @ValorMantenimientoYReparaciones
											  + @ValorGastosDeSistemas
											  + @ValorDepreciaciones
											  + @ValorDiversos
    FROM Presupuestos_Definitivos
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	@Mes_Periodo
	AND IdJerarquia     IN  (195, 202, 203, 204, 205, 211, 223);

    UPDATE Presupuestos_Definitivos
    SET Valor = @ValorGastosGenerales
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	@Mes_Periodo
	AND IdJerarquia		=	194; /* Gastos Generales */

	-- Actualizar el registro GP Monetizaciones Sena

	SET @ValorGPMonetizacionesSena = ISNULL((SELECT Valor
    FROM Presupuestos_Nomina
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	@Mes_Periodo
	AND IdJerarquia     =   193), 0)

    UPDATE Presupuestos_Definitivos
    SET Valor = @ValorGPMonetizacionesSena
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	@Mes_Periodo
	AND IdJerarquia		=	193; /* GP Monetizaciones Sena */

	-- Actualizar el registro Seguridad Industrial

	SET @ValorSeguridadIndustrial = ISNULL((SELECT Valor
    FROM Presupuestos_Nomina
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	@Mes_Periodo
	AND IdJerarquia     =   189), 0)

    UPDATE Presupuestos_Definitivos
    SET Valor = @ValorSeguridadIndustrial
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	@Mes_Periodo
	AND IdJerarquia		=	189; /* Seguridad Industrial */

	-- Actualizar el registro Temporales                     ***     SE DEBE AJUSTAR CON EL SP

    SET @ValorTemporales = ISNULL((SELECT Temporales_Mensajeria
    FROM Presupuestos_Diversos
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	0), 0)

    UPDATE Presupuestos_Definitivos
    SET Valor = @ValorTemporales
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	@Mes_Periodo
	AND IdJerarquia		=	188; /* Temporales */

	-- Actualizar el registro Dotación                       ***     SE DEBE AJUSTAR CON EL SP

    SET @ValorDotacion = ISNULL((SELECT Dotacion
    FROM Presupuestos_Diversos
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	0), 0)

    UPDATE Presupuestos_Definitivos
    SET Valor = @ValorDotacion
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	@Mes_Periodo
	AND IdJerarquia		=	187; /* Dotación */

	-- Actualizar el registro Bonos Al Personal

    SET @ValorBonosAlPersonal = ISNULL((SELECT Valor
    FROM Presupuestos_Nomina
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	@Mes_Periodo
	AND IdJerarquia     =   186), 0)

    UPDATE Presupuestos_Definitivos
    SET Valor = @ValorBonosAlPersonal
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	@Mes_Periodo
	AND IdJerarquia		=	186; /* Bonos Al Personal */

	-- Actualizar el registro Capacitación al Personal

    SET @ValorCapacitacionPersonal = ISNULL((SELECT Valor
    FROM Presupuestos_Nomina
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	@Mes_Periodo
	AND IdJerarquia     =   183), 0)

    UPDATE Presupuestos_Definitivos
    SET Valor = @ValorCapacitacionPersonal
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	@Mes_Periodo
	AND IdJerarquia		=	183; /* Capacitación al Personal */

	-- Actualizar el registro Auxilio de Transporte

    SET @ValorAuxilioTransporte = ISNULL((SELECT Valor
    FROM Presupuestos_Nomina
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	@Mes_Periodo
	AND IdJerarquia     =   182) , 0)

    UPDATE Presupuestos_Definitivos
    SET Valor = @ValorAuxilioTransporte
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	@Mes_Periodo
	AND IdJerarquia		=	182; /* Auxilio de Transporte */

	-- Actualizar el registro Otros Gastos

    SELECT @ValorOtrosGastos = ISNULL(SUM(Valor), 0) + @ValorAuxilioTransporte 
													 + @ValorCapacitacionPersonal
													 + @ValorBonosAlPersonal
													 + @ValorDotacion
													 + @ValorTemporales
													 + @ValorSeguridadIndustrial
													 + @ValorGPMonetizacionesSena
    FROM Presupuestos_Definitivos
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	@Mes_Periodo
	AND IdJerarquia     IN  (190, 191, 192);

    UPDATE Presupuestos_Definitivos
    SET Valor = @ValorOtrosGastos
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	@Mes_Periodo
	AND IdJerarquia		=	181; /* Otros Gastos */

	-- Actualizar el registro Prestaciones y Aportes

    SET @ValorPrestacionesYAportes = ISNULL((SELECT Valor
    FROM Presupuestos_Nomina
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	@Mes_Periodo
	AND IdJerarquia     =   180), 0)

    UPDATE Presupuestos_Definitivos
    SET Valor = @ValorPrestacionesYAportes
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	@Mes_Periodo
	AND IdJerarquia		=	180; /*  Prestaciones y Aportes */

	-- Actualizar el registro Subsidio de transporte

    SET @ValorSubsidioTransporte = ISNULL((SELECT Valor
    FROM Presupuestos_Nomina
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	@Mes_Periodo
	AND IdJerarquia     =   154), 0)

    UPDATE Presupuestos_Definitivos
    SET Valor = @ValorSubsidioTransporte
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	@Mes_Periodo
	AND IdJerarquia		=	154; /*  Subsidio de transporte */

	-- Actualizar el registro Horas extras y recargos

    SET @ValorHorasExtrasYRecargos = ISNULL((SELECT Valor
    FROM Presupuestos_Nomina
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	@Mes_Periodo
	AND IdJerarquia     =   152), 0)

    UPDATE Presupuestos_Definitivos
    SET Valor = @ValorHorasExtrasYRecargos
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	@Mes_Periodo
	AND IdJerarquia		=	152; /*  Horas extras y recargos */

	-- Actualizar el registro  Sueldos

    SET @ValorSueldos = ISNULL((SELECT Valor
    FROM Presupuestos_Nomina
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	@Mes_Periodo
	AND IdJerarquia     =   151), 0)

    UPDATE Presupuestos_Definitivos
    SET Valor = @ValorSueldos
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	@Mes_Periodo
	AND IdJerarquia		=	151; /*  Sueldos */

	-- Actualizar el registro  Salarios integrales

    SET @ValorSalariosIntegrales = ISNULL((SELECT Valor
    FROM Presupuestos_Nomina
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	@Mes_Periodo
	AND IdJerarquia     =   150), 0)

    UPDATE Presupuestos_Definitivos
    SET Valor = @ValorSalariosIntegrales
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	@Mes_Periodo
	AND IdJerarquia		=	150; /*  Salarios integrales */

	-- Actualizar el registro Gastos de Personal

    SELECT @ValorGastosPersonal = SUM(Valor) + @ValorSalariosIntegrales 
											 + @ValorSueldos 
											 + @ValorHorasExtrasYRecargos 
											 + @ValorSubsidioTransporte
											 + @ValorPrestacionesYAportes
											 + @ValorOtrosGastos
											 + @ValorGPMonetizacionesSena
											 + ISNULL((SELECT Valor
														FROM Presupuestos_Nomina
														WHERE IdClase		=	@IdClase 
														AND CodigoLinea		=	@CodigoLinea
														AND CodigoCentro	=	@CodigoCentro
														AND Ano_Periodo		=	@AnoPeriodo
														AND Mes_Periodo		=	@Mes_Periodo
														AND IdJerarquia     =   153), 0) /*Incapacidades*/

    FROM Presupuestos_Definitivos
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	@Mes_Periodo
	AND IdJerarquia     IN   (155, 165, 169, 177);

    UPDATE Presupuestos_Definitivos
    SET Valor = @ValorGastosPersonal
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	@Mes_Periodo
	AND IdJerarquia		=	149; /* Gastos de Personal */

	-- Actualizar el registro Gastos Contact Center y Digital

    SELECT @ValorGastosContactCenterYDigital = SUM(Valor)
    FROM Presupuestos_Definitivos
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	@Mes_Periodo
	AND IdJerarquia IN (146, 147);

    UPDATE Presupuestos_Definitivos
    SET Valor = @ValorGastosContactCenterYDigital
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	@Mes_Periodo
	AND IdJerarquia		=	145; /* Gastos Contact Center y Digital */

	-- Actualizar el registro Traspasos y matriculas

    SELECT @ValorTraspasosYMatriculas = SUM(Valor)
    FROM Presupuestos_Definitivos
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	@Mes_Periodo
	AND IdJerarquia IN (142, 143);

    UPDATE Presupuestos_Definitivos
    SET Valor = @ValorTraspasosYMatriculas
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	@Mes_Periodo
	AND IdJerarquia		=	141; /* Traspasos y matriculas */

	-- Actualizar el registro Ferias y exposiciones

    SELECT @ValorPropagandaYPublicidad = SUM(Valor)
    FROM Presupuestos_Definitivos
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	@Mes_Periodo
	AND IdJerarquia IN (129, 130, 131);

    UPDATE Presupuestos_Definitivos
    SET Valor = @ValorPropagandaYPublicidad
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	@Mes_Periodo
	AND IdJerarquia		=	128; /* Gastos de viaje*/

	-- Actualizar el registro Ferias y exposiciones

    SELECT @ValorFeriasExposiciones = SUM(Valor)
    FROM Presupuestos_Definitivos
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	@Mes_Periodo
	AND IdJerarquia IN (122, 123);

    UPDATE Presupuestos_Definitivos
    SET Valor = @ValorFeriasExposiciones
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	@Mes_Periodo
	AND IdJerarquia		=	121; /* Gastos de viaje*/

	-- Actualizar el registro Gastos de viaje

    SELECT @ValorGastosViaje = SUM(Valor)
    FROM Presupuestos_Definitivos
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	@Mes_Periodo
	AND IdJerarquia IN (118, 119, 120);

    UPDATE Presupuestos_Definitivos
    SET Valor = @ValorGastosViaje
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	@Mes_Periodo
	AND IdJerarquia		=	117; /* Gastos de viaje*/

	-- Actualizar el registro Comisiones pagos a terceros

    SELECT @ValorComicionesATerceros = SUM(Valor)
    FROM Presupuestos_Definitivos
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	@Mes_Periodo
	AND IdJerarquia IN (114, 115);

    UPDATE Presupuestos_Definitivos
    SET Valor = @ValorComicionesATerceros
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	@Mes_Periodo
	AND IdJerarquia		=	113; /*Comisiones pagadas a terceros*/

	-- Actualizar el registro Gastos De Ventas

    SELECT @ValorGastosDeVentas = SUM(Valor) + @ValorComicionesATerceros 
											 + @ValorGastosViaje 
											 + @ValorFeriasExposiciones 
											 + @ValorPropagandaYPublicidad 
											 + @ValorTraspasosYMatriculas
											 + @ValorGastosContactCenterYDigital
    FROM Presupuestos_Definitivos
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	@Mes_Periodo
	AND IdJerarquia IN (111, 112, 116, 124, 125, 126, 127, 132, 133, 134, 
                          135, 136, 137, 138, 139, 140, 144, 148);

    UPDATE Presupuestos_Definitivos
    SET Valor = @ValorGastosDeVentas
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	@Mes_Periodo
	AND IdJerarquia		=	110; /*GastosDeVentas*/

	-- Actualizar el registro Gastos De Ventas

	SET @ValorGastosDeOperacion = @ValorGastosDeVentas + @ValorGastosPersonal + @ValorGastosGenerales

    UPDATE Presupuestos_Definitivos
    SET Valor = @ValorGastosDeOperacion 
    WHERE IdClase		=	@IdClase 
	AND CodigoLinea		=	@CodigoLinea
	AND CodigoCentro	=	@CodigoCentro
	AND Ano_Periodo		=	@AnoPeriodo
	AND Mes_Periodo		=	@Mes_Periodo
	AND IdJerarquia		=	109; /*GastosDeOperacion*/


END;

```
